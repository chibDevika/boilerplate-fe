import React from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function HomePage() {
  const navigate = useNavigate();

  const onSuccess = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <GoogleLogout
              clientId={process.env.REACT_APP_CLIENT_ID}
              hostedDomain="squadstack.com"
              buttonText="Logout"
              onLogoutSuccess={onSuccess}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePage;
