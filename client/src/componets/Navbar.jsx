// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Ceyee</div>
      <button className="navbar-toggler" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
