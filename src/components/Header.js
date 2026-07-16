import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { t } = useTranslation();

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

      <nav id="main-nav" className={`nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink>
        <NavLink to="/skills" onClick={() => setMenuOpen(false)}>{t('nav.skills')}</NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>{t('nav.projects')}</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavLink>
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('nav.menu')}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
