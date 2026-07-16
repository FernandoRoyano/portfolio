import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-branding">
        <span>© {new Date().getFullYear()} Fernando Royano</span>
      </div>
      <p className="footer-rights">{t('footer.rights')}</p>
    </footer>
  );
}

export default Footer;
