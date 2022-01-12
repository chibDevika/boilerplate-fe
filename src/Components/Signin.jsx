import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../refreshToken';
import HomePage from './HomePage';

function Signin() {
  const navigate = useNavigate();
  const onSuccess = (response) => {
    refreshTokenSetup(response);
    navigate('/HomePage');
  };

  const onFailure = () => {};

  return (
    <div>
      <GoogleLogin
        clientId={process.env.CLIENT_ID}
        hostedDomain="squadstack.com"
        responseType="id_token"
        buttonText="Sign In"
        uxMode="popup"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="http://localhost:3000"
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Signin;
