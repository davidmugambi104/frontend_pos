import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e) => {
      if (isMenuActive && !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuActive]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <Link to="/" className="nav-logo">pos</Link>

        <div className={`hamburger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`nav-menu ${isMenuActive ? 'active' : ''}`}>
          <div className="nav-item dropdown">
            <Link to="/products" className="nav-link">Products</Link>
            <div className="dropdown-menu">
              <Link to="/products/web" className="dropdown-item">Web Apps</Link>
              <Link to="/products/mobile" className="dropdown-item">Mobile Apps</Link>
              <Link to="/products/ai" className="dropdown-item">AI Solutions</Link>
            </div>
          </div>
          
          <div className="nav-item">
            <Link to="/sales" className="nav-link">Sales</Link>
          </div>
          
          <div className="nav-item dropdown">
            <Link to="/customers" className="nav-link">Customers</Link>
            <div className="dropdown-menu">
              <Link to="/customers/testimonials" className="dropdown-item">Testimonials</Link>
              <Link to="/customers/case-studies" className="dropdown-item">Case Studies</Link>
            </div>
          </div>
          
          <div className="nav-item">
            <Link to="/login" className="nav-link login-btn">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;