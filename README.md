# Portfolio — Fernando Royano

Portfolio personal de **Fernando Royano**, Product Builder & Full Stack Developer.
SPA en React con soporte bilingüe (ES/EN), tema claro/oscuro y animaciones GSAP.

**En producción:** [portfolio-leaq.vercel.app](https://portfolio-leaq.vercel.app)

**Documentación:** [Arquitectura](docs/ARCHITECTURE.md) · [Registro de decisiones](docs/DECISIONS.md)

---

## Stack

| Capa | Tecnología |
|---|---|
| UI | React 18, React Router 6 |
| Build | Create React App (`react-scripts` 5) |
| Estilos | CSS con custom properties, sin framework |
| i18n | i18next + react-i18next, detección automática de idioma |
| Animación | GSAP (timelines por página) |
| Formulario | EmailJS |
| Tests | Jest + React Testing Library |
| Deploy | Vercel (automático desde `main`) |

---

## Arranque

```bash
git clone https://github.com/FernandoRoyano/portfolio.git
cd portfolio
npm install
cp .env.example .env   # rellenar con las credenciales de EmailJS
npm start
```

La app queda en `http://localhost:3000`.

### Variables de entorno

El formulario de contacto usa EmailJS. Copia `.env.example` a `.env` y rellena:

```
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
```

Estos tres valores son públicos por diseño: acaban en el bundle del cliente, como
cualquier variable `REACT_APP_*`. Lo que impide el abuso es la lista de dominios
permitidos en el panel de EmailJS, no ocultarlos. Sin `.env` la app arranca, pero
el envío del formulario falla.

### Scripts

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción en `build/` |
| `npm test` | Tests en modo watch |
| `npm run lint` | ESLint sobre `src/`, sin tolerancia a warnings |

---

## Estructura

```
src/
├── components/     Header, Footer, LanguageSwitcher, ThemeToggle
├── pages/          Home, Skills, Projects, Contact — una por ruta
├── data/           projectsData.js, skillsData.js — datos no traducibles
├── context/        ThemeContext — tema claro/oscuro con persistencia
├── i18n/           es.json, en.json + configuración de i18next
└── __tests__/      Tests de i18n, Header y Projects
public/
├── projects/       Capturas de los proyectos (WebP)
├── images/         Avatar y imagen de Open Graph
└── skills-icons/   Iconos servidos en local
```

---

## Decisiones de diseño

**El contenido traducible vive solo en `i18n/`.** `projectsData.js` y `skillsData.js`
guardan únicamente lo que no se traduce: stack, enlaces, rutas de imagen e `id`.
Los textos se resuelven con ese `id` (`t('projects.items.amuzim.name')`), nunca por
posición en el array. Un esquema indexado por posición acopla tres ficheros entre sí:
insertar un proyecto en uno solo desplaza los textos de todos los siguientes sin que
falle el build. Con claves estables, el orden deja de importar.

**Sin valores por defecto en `t()`.** El segundo argumento de `t('clave', 'texto')`
tapa las claves ausentes en silencio, así que una traducción que falta se ve como texto
correcto en el idioma equivocado. Aquí las claves se declaran en ambos locales y un test
verifica que los dos árboles son idénticos. En desarrollo, una clave ausente escribe un
error en consola.

**Sin librería de componentes.** Los estilos son CSS plano con custom properties.
El tema claro/oscuro se resuelve con un atributo `data-theme` en `<html>` y variables
CSS — sin CSS-in-JS ni recálculos en tiempo de ejecución.

**Imágenes en WebP.** Las capturas se sirven a 800px de ancho: se muestran a ~377 CSS px,
lo que cubre pantallas 2x. El conjunto de `public/` pesa ~450 KB.

---

## Tests

```bash
npm test
```

14 tests sobre lo que puede romperse en silencio:

- **`i18n.test.js`** — que `es.json` y `en.json` declaren exactamente las mismas claves,
  que no haya valores vacíos y que cada proyecto y categoría tenga traducción en ambos
  idiomas.
- **`Header.test.js`** — que la navegación se traduzca de verdad al cambiar de idioma,
  y que el menú móvil exponga su estado a lectores de pantalla.
- **`Projects.test.js`** — que se renderice una tarjeta por proyecto, que los que tienen
  captura vayan delante, que los enlaces externos lleven `rel="noopener"` y que las
  tarjetas cambien de idioma.

---

## Licencia

[MIT](LICENSE) © Fernando Royano

---

## Contacto

[LinkedIn](https://www.linkedin.com/in/fernando-royano-cabrero-dev/) ·
[GitHub](https://github.com/FernandoRoyano) ·
[fernandoroyano@gmail.com](mailto:fernandoroyano@gmail.com)
