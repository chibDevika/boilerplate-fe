import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const client_id =
  '775627361104-rldutbneq1qi1floukp4sgauct6qg4at.apps.googleusercontent.com';

function Signin() {
  const navigate = useNavigate();
  const onSuccess = () => {
    // refreshTokenSetup(response);
    // navigate('/HomePage');
  };

  const onFailure = () => {};

  return (
    <div>
      <GoogleLogin
        clientId={process.env.CLIENT_ID}
        hostedDomain="squadstack.com"
        // responseType="id_token"
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
