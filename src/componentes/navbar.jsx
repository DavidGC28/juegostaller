import React from 'react';
import './navbar.css';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><h2>GAMESTORE</h2></div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-btn">Lista de Juegos</Link></li>
        <li><Link to="/nuevo" className="nav-btn">Registrar Juego</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;