import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;
      if (window.scrollY > 80) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header" ref={headerRef}>
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
