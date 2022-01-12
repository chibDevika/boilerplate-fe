import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function Signout() {
  const navigate = useNavigate();
  const onSuccess = () => {
    localStorage.removeItem('authToken');
    navigate('/LandingPage');
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.CLIENT_ID}
        hostedDomain="squadstack.com"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Signout;
