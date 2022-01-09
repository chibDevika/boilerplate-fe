import React from 'react';
import './App.css';
import Home from './Home';
import Signin from './Signin';
import { auth } from './Firebase/firebase';

function App() {
  const user = auth.currentUser;
  // need to implement routing
  if (user) {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
  return (
    <div className="App">
      <Signin />
    </div>
  );
}

export default App;
