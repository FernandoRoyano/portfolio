import es from '../i18n/es.json';
import en from '../i18n/en.json';
import projects from '../data/projectsData';
import skills from '../data/skillsData';

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object' && !Array.isArray(value)
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

describe('i18n', () => {
  // Los locales se indexan por id, no por posición: una clave que falte debe
  // detectarse aquí y no en producción, donde el default la tapaba en silencio.
  it('define exactamente las mismas claves en es y en', () => {
    expect(flatten(en).sort()).toEqual(flatten(es).sort());
  });

  it('no deja ningún valor vacío', () => {
    const empty = [];
    for (const [locale, tree] of Object.entries({ es, en })) {
      for (const key of flatten(tree)) {
        const value = key.split('.').reduce((acc, k) => acc[k], tree);
        if (String(value).trim().length === 0) empty.push(`${locale}:${key}`);
      }
    }
    expect(empty).toEqual([]);
  });

  it('traduce todos los proyectos en ambos idiomas', () => {
    for (const { id } of projects) {
      expect(es.projects.items[id]).toBeDefined();
      expect(en.projects.items[id]).toBeDefined();
    }
  });

  it('no deja claves de proyecto huérfanas en los locales', () => {
    const ids = projects.map((p) => p.id);
    expect(Object.keys(es.projects.items).sort()).toEqual([...ids].sort());
    expect(Object.keys(en.projects.items).sort()).toEqual([...ids].sort());
  });

  it('traduce todas las categorías de skills en ambos idiomas', () => {
    for (const { id } of skills) {
      expect(es.skills.categories[id]).toBeDefined();
      expect(en.skills.categories[id]).toBeDefined();
    }
  });
});
