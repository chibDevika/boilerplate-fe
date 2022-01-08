import React from 'react';
import './App.css';
import Home from './Home';
import Signin from './Signin';
import { auth } from './Firebase/firebase';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
  // const user = auth.currentUser;

  // if (user) {
  //   return (
  //     <div className="App">
  //       <Home />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="App">
  //       <Home />
  //     </div>
  //   );
  // }
}

export default App;
