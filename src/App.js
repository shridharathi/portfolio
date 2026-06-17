import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Work from './pages/Work/Work';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('darkMode') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('darkMode', String(darkMode)); } catch {}
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}>
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
      <Work darkMode={darkMode} />
    </div>
  );
}

export default App;
