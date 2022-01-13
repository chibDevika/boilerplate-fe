import React from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../refreshToken';

function LandingPage() {
  const navigate = useNavigate();
  const onSuccess = (response) => {
    refreshTokenSetup(response);
    navigate('/dashboard');
  };

  const onFailure = () => {};

  return (
    <Box
      sx={{
        width: 400,
        height: 200,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom component="div" padding={1}>
        Sign in to continue to
      </Typography>
      <Typography variant="h5" gutterBottom component="div" paddingBottom={3}>
        SquadStack Leaves Manager
      </Typography>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          hostedDomain="squadstack.com"
          responseType="id_token"
          buttonText="Sign In"
          uxMode="popup"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="http://localhost:3000"
          style={{ marginTop: '1em' }}
          isSignedIn={true}
        />
      </div>
    </Box>
  );
}

export default LandingPage;
