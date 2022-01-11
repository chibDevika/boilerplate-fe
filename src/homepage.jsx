import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '775627361104-rldutbneq1qi1floukp4sgauct6qg4at.apps.googleusercontent.com';

function homepage() {
  const onSuccess = () => {
    console.log('Logout successful');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        hostedDomain="squadstack.com"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default homepage;
