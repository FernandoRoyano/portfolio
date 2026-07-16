# Registro de decisiones

Decisiones de diseño con su contexto y sus alternativas descartadas. Cada una
responde a un problema concreto que este proyecto tuvo; ninguna es preferencia
abstracta.

Para la vista estructural, ver [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 1. El contenido traducible se indexa por `id`, no por posición

**Problema.** Los textos de los proyectos se resolvían con
`t('projects.items.${index}.name')`, donde `index` era la posición en el array de
`projectsData.js`. Eso acoplaba tres archivos entre sí: `projectsData.js`,
`es.json` y `en.json` tenían que mantener el mismo orden para siempre.

Insertar o borrar un proyecto en uno solo desplazaba silenciosamente los textos de
todos los siguientes. **Sin error de build, sin test en rojo.** Cada tarjeta
mostraba el nombre y la descripción de su vecina, y solo se veía mirando la página.

**Decisión.** Cada proyecto lleva un `id` estable (`amuzim`, `trainhub`…) y el i18n
es un objeto indexado por ese id.

**Descartado:** mantener el índice y añadir un test de longitud. Habría detectado
que los arrays se desincronizan en tamaño, pero no que están desordenados — el
fallo más probable.

**Consecuencia.** `projectsData.js` guarda solo lo que no se traduce: `id`,
tecnologías, enlace e imagen. Los textos que antes duplicaba y que nunca se
renderizaban desaparecieron.

---

## 2. Prohibido el segundo argumento de `t()`

**Problema.** El código usaba `t('contact.title', 'Contacto')`. Ese segundo
argumento es un *valor por defecto*: i18next lo devuelve cuando la clave no existe.

Once claves no existían **en ninguno de los dos locales**. Como los defaults
estaban escritos en español, pulsar EN dejaba la navegación, la página de contacto
entera y los títulos de Skills sin traducir. No había warning en consola, ni fallo
de build, ni test en rojo. El mecanismo pensado para dar robustez es exactamente
lo que ocultó el bug durante meses.

**Decisión.** Las claves se declaran en ambos locales o no se usan. Sin defaults.

**Refuerzos:**
- `i18n.test.js` verifica que los dos árboles son idénticos. Es un contrato, no una
  convención.
- En desarrollo, `missingKeyHandler` escribe un `console.error` con la clave que
  falta.

**Descartado:** dejar los defaults y traducirlos. Habría arreglado el síntoma
manteniendo el mecanismo que lo esconde.

---

## 3. Los encabezados se estilan por clase, nunca por etiqueta

**Problema.** `/skills`, `/projects` y `/contact` arrancaban en `<h2>`: ninguna
tenía `h1`. Pero cambiar la etiqueta no bastaba, porque el CSS estaba acoplado al
elemento (`.skills-section h2`). Con `h1`, esas reglas dejaban de aplicar: el
título caía al default de 2em y perdía el margen, porque el reset de `index.css`
fuerza `margin: 0` en `h1..h6`. El resultado de "mejorar la semántica" habría sido
un título más pequeño y pegado al subtítulo.

**Decisión.** Clases (`.section-title`, `.category-title`, `.project-title`…). Es
lo que `Home.js` ya hacía con `.headline` — por eso Home nunca tuvo este problema.

**Beneficio secundario.** Las animaciones de GSAP hacían `querySelector('h2')`.
Ahora apuntan a `.section-title`, así que el nivel del encabezado se puede cambiar
por criterio semántico sin romper ni el estilo ni la animación.

**Consecuencia obligada.** Poner `h1` dejaba a Skills y Projects con un salto
`h1 → h3`, que es una violación de `heading-order` que Lighthouse audita. Los `h3`
bajaron a `h2`. Arreglar la semántica a medias habría cambiado un fallo por otro.

---

## 4. `gsap.matchMedia()` para reduced-motion, no pausar el timeline

**Problema.** 27 tweens de GSAP y tres animaciones infinitas, sin ninguna concesión
a quien tiene sensibilidad vestibular.

**La trampa.** Lo natural es crear el timeline y pausarlo. **Eso deja la página en
blanco.** GSAP aplica el estado `from` en t=0, así que `opacity: 0` se queda fijo
inline. El usuario con reduced-motion no vería una página quieta: no vería nada.

**Decisión.** `gsap.matchMedia()` con la rama `(prefers-reduced-motion: no-preference)`.
El timeline **solo se construye** si no hay preferencia por reducir movimiento.

Esto es seguro por un hecho verificado: **ningún elemento animado lleva
`opacity: 0` en el CSS base**. Esa opacidad solo vive dentro del `from` de cada
tween. Si el timeline no se crea, nadie escribe opacidad inline y el contenido se
ve por CSS.

**Descartado:** un early return con `matchMedia` a pelo. Funciona, pero está atado
a un `useEffect` con `[]`: si el usuario activa la preferencia con la página
abierta, no se entera y deja los estilos inline puestos. `mm.revert()` sí los
deshace.

---

## 5. Home no va bajo demanda

**Problema.** Las cuatro páginas se importaban de forma estática: entrar en la home
descargaba también el código de las otras tres.

**Decisión.** `React.lazy` para Skills, Projects y Contact. **Home se queda
estática.**

**Por qué.** Home es la ruta de entrada. Pasarla por lazy añade un viaje de red
antes de poder pintarla (main.js → ejecutar → Suspense → pedir el chunk), y Create
React App no emite `<link rel="preload">` para chunks async sin eyectar. Sería
pagar latencia en la ruta más visitada a cambio de nada.

**Resultado honesto.** El first load de `/` pasa de 117,6 a 114,9 KB gzip: **2,7 KB,
un 2,3%**. Poco. `main.js` está dominado por React, React Router, i18next, GSAP y
react-icons, y todo eso se queda para `/` de todas formas. Los componentes de las
tres páginas apenas pesan unos KB.

**Se mantiene igualmente** porque la arquitectura es la correcta: el día que
Contact necesite una dependencia pesada, la home no la pagará. Pero no se vende
como una victoria de rendimiento, porque no lo es.

---

## 6. Los iconos se sirven en local

**Problema.** Los 16 iconos de tecnologías venían de `cdn.jsdelivr.net`. Si el CDN
cae, va lento o está bloqueado (redes corporativas, algunos países), la página
Skills se queda vacía. Un punto único de fallo, de un tercero, por decoración.

**Decisión.** Los 16 SVG a `public/skills-icons/`, junto a los de Claude y OpenAI
que ya estaban ahí.

**Coste.** 32,4 KB en el repositorio (los 16 nuevos), **0 en el bundle**: `public/`
no pasa por webpack. Mismo número de peticiones, pero al mismo origen, así que se
ahorran el DNS y el TLS handshake contra un dominio ajeno y se multiplexan por la
conexión ya abierta.

**Pendiente relacionado.** Las fuentes siguen viniendo de Google Fonts con un
`@import` en `index.css:1`, que es el mismo problema y de mayor impacto: serializa
tres viajes de red bloqueando el render.

---

## 7. Las credenciales de EmailJS son públicas, y está bien

**Contexto.** Los IDs y la public key de EmailJS estaban escritos en `Contact.js`.

**Decisión.** Pasan a variables `REACT_APP_EMAILJS_*`, con `.env.example` como
plantilla.

**Sin autoengaño.** Esto **no** es un arreglo de seguridad. Cualquier variable
`REACT_APP_*` acaba en el bundle del cliente: siguen siendo públicas y son
públicas por diseño. Lo que impide el abuso es la lista de dominios permitidos del
panel de EmailJS.

**Entonces por qué.** Dos razones honestas: no versionar credenciales de una cuenta
concreta, y que un revisor no tenga que pararse a razonar el matiz al ver claves
literales en el código. Es higiene y comunicación, no protección.

---

## 8. `public/` no es un cajón

**Problema encontrado.** `public/skills/` contenía 21 documentos de trabajo
internos, incluido el contexto de negocio de un cliente. Create React App copia
`public/` **tal cual** al build: se habrían servido en `/skills/*.md`, indexables.
No llegaron a desplegarse porque no estaban versionados, pero un `git add .` los
publicaba.

**Decisión.** Fuera de `public/`, a `.claude/`, que está ignorado. Y `.gitignore`
endurecido: `.env` a secas (solo cubría `.env.*.local`, el hueco clásico de CRA),
`.vscode/` y `CLAUDE.md` — este último porque el repositorio es público y describe
proyectos privados.

**Regla que queda.** Todo lo que entra en `public/` se publica en internet. No es
una carpeta de trabajo.

---

## 9. Los tests cubren los fallos que hubo, no una métrica

**Contexto.** El único test era el de scaffold de Create React App, que buscaba
"learn react". `npm test` estaba en rojo.

**Decisión.** 14 tests dirigidos a los fallos que este proyecto ya tuvo:

- Que `es.json` y `en.json` declaren las mismas claves → el bug del §2.
- Que la navegación se traduzca de verdad al pulsar EN → el síntoma visible del §2.
- Que cada proyecto y categoría tenga traducción en ambos idiomas → el bug del §1.

**Se comprobó que fallan cuando deben:** al volver a hardcodear "Inicio" en el
Header, uno se pone en rojo; al borrar una clave de `en.json`, otro. Un test que no
se ha visto fallar no protege de nada.

**No se persigue cobertura.** No hay tests de los timelines de GSAP ni de los
estilos: eso se verifica en el navegador, que es donde vive el fallo.

**Hallazgo del camino.** Escribir el test del Header destapó un bug real:
`useTheme()` reventaba con un `TypeError` de destructuring fuera del provider. Se
encontró ejecutando, no leyendo.

---

## 10. Create React App, sabiendo lo que es

**Contexto.** El proyecto está sobre `react-scripts` 5.0.1. CRA ya no se mantiene.

**Decisión.** Se mantiene por ahora.

**Por qué.** Migrar a Vite es medio día y no cambia nada que el usuario perciba: el
sitio ya carga en 115 KB gzip y despliega en Vercel sin fricción. Las ganancias
serían de experiencia de desarrollo (arranque en frío, HMR), que en un proyecto de
este tamaño no aprieta.

**Cuándo reconsiderarlo.** Si aparece una vulnerabilidad sin parche en la cadena de
`react-scripts`, o si hace falta algo que CRA no da sin eyectar — por ejemplo,
`<link rel="preload">` para los chunks async, que es justo lo que limita el §5.

**Restos ya eliminados:** `reportWebVitals` (se llamaba sin callback, así que su
`import('web-vitals')` no se disparaba nunca), `App.css`, `logo.svg`, el
`App.test.js` de fábrica y la dependencia `aos`, instalada y jamás importada.
