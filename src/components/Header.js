import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Correct path to CSS directory

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">MyApp</Link>
        
        {/* Hamburger Menu for mobile view */}
        <div className={`hamburger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navbar Menu */}
        <div className={`nav-menu ${isMenuActive ? 'active' : ''}`}>
          <div className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </div>
          <div className="nav-item">
            <Link to="/sales" className="nav-link">Sales</Link>
          </div>
          <div className="nav-item">
            <Link to="/customers" className="nav-link">Customers</Link>
          </div>
          <div className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
