import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import Signin from './Signin';

function App() {
  return (
    <div className="App">
      <Signin />
      <Homepage />
    </div>
  );
  // const user = auth.currentUser;
  // need to implement routing
  // if (user) {
  //   return (
  //     <div className="App">
  //       <Home />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="App">
  //       <Signin />
  //     </div>
  //   );
  // }
}

export default App;
