import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LandingPage from './LandingPage';

function RoutesDir() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesDir;
