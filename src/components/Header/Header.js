import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Header({ darkMode, onToggleDark }) {
  return (
    <header>
      <div className="titles">
        <h1 className="name">
          <a href="/">Shridhar Athinarayanan</a>
        </h1>
        <div className="links">
          <a href="mailto:shriathi@stanford.alumni.edu" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </a>
          <a href="https://www.linkedin.com/in/shridhar-athinarayanan-638493199/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a href="https://github.com/shridharathi" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
          <a href="https://medium.com/@shridharathi" target="_blank" rel="noreferrer" aria-label="Medium">
            <FontAwesomeIcon icon={faMedium} size="xl" />
          </a>
        </div>
      </div>
      <button className="dark-toggle" onClick={onToggleDark} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </button>
    </header>
  );
}
