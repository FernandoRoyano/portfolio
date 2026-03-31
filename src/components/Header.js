import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === 1) {
          header.classList.add('header-scrolled');
        } else if (self.scroll() < 80) {
          header.classList.remove('header-scrolled');
        }
      },
    });

    return () => ScrollTrigger.killAll();
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
