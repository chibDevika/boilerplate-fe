import React, { useCallback } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from './axiosInstance';
import { validateAccessToken } from './ValidateToken';

function LandingPage() {
  const navigate = useNavigate();

  if (localStorage.getItem('access_token')) {
    const response = validateAccessToken();
    if (response) {
      navigate('/dashboard');
    }
  }

  const sendPostRequest = useCallback((response) => {
    axios({
      method: 'post',
      url: 'employees/employees/',
      data: {
        username: response.data['id'],
        first_name: response.data['given_name'],
        last_name: response.data['family_name'],
        email: response.data['email'],
      },
    }).then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('emp_id', res.data.data['id']);
      navigate('/dashboard');
    });
  }, []);

  const getUserDetails = useCallback(() => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + localStorage.getItem('access_token')
    }).then((response) => {
      sendPostRequest(response);
    });
  }, []);

  const getRefreshToken = useCallback((response) => {
    const form_data = new FormData();
    form_data.append('code', response.code);
    form_data.append('client_id', process.env.REACT_APP_CLIENT_ID);
    form_data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    form_data.append('redirect_uri', 'http://localhost:3000');
    form_data.append('grant_type', 'authorization_code');
    axios({
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      data: form_data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('expires_in', res.data.expires_in);
      localStorage.setItem('timestamp', new Date().getSeconds());
      getUserDetails();
    });
  }, []);

  const onSuccess = (response) => {
    getRefreshToken(response);
  };

  const onFailure = () => {};
  return (
    <Box boxShadow={2} width={400} height={200} mx="auto" my="15%">
      <Typography variant="h5" gutterBottom component="div" padding={1}>
        Sign in to continue to
      </Typography>
      <Typography variant="h5" gutterBottom component="div" paddingBottom={3}>
        SquadStack Leave Manager
      </Typography>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          hostedDomain="squadstack.com"
          responseType="code"
          accessType="offline"
          buttonText="Sign In"
          onSuccess={onSuccess}
          onFailure={onFailure}
          style={{ marginTop: '1em' }}
          prompt="consent"
        />
      </div>
    </Box>
  );
}

export default LandingPage;
