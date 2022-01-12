import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LandingPage from './Components/LandingPage';
import HomePage from './Components/HomePage';
import RoutesDir from './Components/RoutesDir';

function App() {
  return (
    <div className="App">
      <div className="RoutesDir">
        <RoutesDir />
      </div>
    </div>
  );
}

export default App;
