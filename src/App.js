import './App.css';
import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Work from './pages/Work/Work';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', String(darkMode));
    } catch {}
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`body ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />
      <Work />
    </div>
  );
}

export default App;