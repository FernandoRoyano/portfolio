import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">Fernando Royano · Product Builder</div>
      <LanguageSwitcher />
      {/* Botón hamburguesa */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/skills" onClick={() => setMenuOpen(false)}>Habilidades</Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>Proyectos</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;
