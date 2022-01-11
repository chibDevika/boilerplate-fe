import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refreshToken';

const clientId =
  '775627361104-rldutbneq1qi1floukp4sgauct6qg4at.apps.googleusercontent.com';

function Signin() {
  const onSuccess = (response) => {
    refreshTokenSetup(response);
  };

  const onFailure = (res) => {
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        hostedDomain="squadstack.com"
        responseType="id_token"
        buttonText="Login"
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
