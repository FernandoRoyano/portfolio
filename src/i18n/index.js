import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './es.json';
import en from './en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: {
      escapeValue: false
    },
    // Una clave ausente devolvía su valor por defecto en silencio, así que el
    // texto sin traducir pasaba desapercibido. En desarrollo debe cantar.
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lngs, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[i18n] falta la clave "${key}" en: ${lngs.join(', ')}`);
      }
    }
  });

export default i18n;
