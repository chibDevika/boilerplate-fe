import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import Home from './Home';

function Signin() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;
        return console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
      .finally(() => {
        return <Home />;
      });
  };

  return (
    <div className="header">
      <h1 className="App-header">Sign In to continue!</h1>
      <Button variant="contained" onClick={signInWithGoogle}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
