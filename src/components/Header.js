import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

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
      <div className="logo">
        <span className="logo-dot" aria-hidden="true"></span>
        <span className="logo-text">Fernando Royano</span>
        <span className="logo-sub">· Product Builder</span>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Inicio</NavLink>
        <NavLink to="/skills" onClick={() => setMenuOpen(false)}>Habilidades</NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>Proyectos</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contacto</NavLink>
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
