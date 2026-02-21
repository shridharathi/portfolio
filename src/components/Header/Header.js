import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header>
      <div className="header-inner">
        <h1 className="name">
          <a href="/">Shridhar Athinarayanan</a>
        </h1>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
        </button>
      </div>
    </header>
  );
}