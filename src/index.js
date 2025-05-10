import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './i18n'; // ⚠️ Carga la configuración
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // ⚠️ Importa la instancia de i18n para pasarla al provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
