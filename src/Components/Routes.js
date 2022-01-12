import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LandingPage from './LandingPage';

function RoutesDir() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesDir;
