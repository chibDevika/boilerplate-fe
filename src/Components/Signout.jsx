import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const cl =
  '775627361104-rldutbneq1qi1floukp4sgauct6qg4at.apps.googleusercontent.com';

function Signout() {
  const navigate = useNavigate();
  const onSuccess = () => {
    localStorage.removeItem('authToken');
    // navigate('/LandingPage');
  };

  return (
    <div>
      <GoogleLogout
        clientId={cl}
        hostedDomain="squadstack.com"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Signout;
