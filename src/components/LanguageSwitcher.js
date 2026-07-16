import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  return (
    <div className="language-switcher">
      {LANGUAGES.map(({ code, flag, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => i18n.changeLanguage(code)}
          aria-label={label}
          aria-pressed={current === code}
        >
          <span aria-hidden="true">{flag} {code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
