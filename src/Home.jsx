import React from 'react';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase/firebase';

function Exit() {
  const SignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log('logged out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <h1 className="App-header">Welcome</h1>
      <Button variant="contained" onClick={SignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Exit;
