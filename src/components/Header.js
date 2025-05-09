import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Mi Portfolio</div>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/skills">Habilidades</Link>
        <Link to="/projects">Proyectos</Link>
        <Link to="/contact">Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;
