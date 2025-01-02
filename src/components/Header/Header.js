import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMedium } from '@fortawesome/free-brands-svg-icons';


export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="titles">
          <h1 className="name">
            <Link to="/">Shridhar Athinarayanan</Link>
          </h1>
        <div className="links">
          <a href="mailto:shriathi@stanford.alumni.edu">
            <FontAwesomeIcon icon={faEnvelope} size="xl"  />
          </a>
          <a href="https://www.linkedin.com/in/shridhar-athinarayanan-638493199/">
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a href="https://github.com/shridharathi">
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
          <a href="https://medium.com/@shridharathi">
            <FontAwesomeIcon icon={faMedium} size="xl" />
          </a>
        </div>
      </div>
      <div className="nav-container">
        <Link to="/">Work</Link>
        <Link to="/art">Art</Link>
      </div>
    </header>
  );
}