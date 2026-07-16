import '@testing-library/jest-dom';

// jsdom no implementa matchMedia, y ThemeProvider lo consulta al inicializarse
// para detectar el tema del sistema.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});
