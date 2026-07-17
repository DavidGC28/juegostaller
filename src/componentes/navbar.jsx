import React from 'react';
import './navbar.css';

function Navbar({ onCambiarVista }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>GAMESTORE</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <button className="nav-btn" onClick={() => onCambiarVista('tabla')}>
            Lista de Juegos
          </button>
        </li>
        <li>
          <button className="nav-btn" onClick={() => onCambiarVista('formulario')}>
            Registrar Juego
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;