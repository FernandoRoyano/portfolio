import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-branding">
        <span>© {new Date().getFullYear()} Fernando Royano</span>
      </div>
      <p className="footer-rights">Todos los derechos reservados</p>
    </footer>
  );
}

export default Footer;
