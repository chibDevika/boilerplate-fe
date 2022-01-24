import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LandingPage from './LandingPage';

function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<HomePage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}

export default Routes;
