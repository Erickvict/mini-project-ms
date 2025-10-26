import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">ProjectManager</div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link 
            to="/projects" 
            className={location.pathname === '/projects' ? 'active' : ''}
          >
            Projects
          </Link>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;