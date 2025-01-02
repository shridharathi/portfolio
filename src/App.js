import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/Header/Header';
import Work from './pages/Work/Work';
import Art from './pages/Art/Art';

function App() {
  return (
    <div className="body">
      <Header />

      <Routes>
        <Route exact path="/" element={<Work />} />
        <Route exact path="/art" element={<Art />} />
        <Route exact path="*" element={<Work />} />
      </Routes>
    </div>
  );
}

export default App;