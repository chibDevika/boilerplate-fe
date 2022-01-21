import React, { useCallback, useState } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../refreshToken';
import axios from './axiosInstance';

function LandingPage() {
  const validateAccessToken = () => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + localStorage.getItem('access_token')
    }).then((res) => {
      console.log("have token but got error", res)
      if (res.status === 200) {
        console.log("status is ok")
        navigate('/dashboard');
      }
      else {
        console.log("status is not ok")
        generateAccessToken(localStorage.getItem('refresh_token'));//use refresh token to get an access token
      }
    }).catch((error) => {
      console.log("validation ", error);
    })
  };

  validateAccessToken();

  const sendPostRequest = useCallback((response) => {
    axios({
      method: 'post',
      url: 'employees/employees/',
      data: {
        username: response.data['id'],
        first_name: response.data['given_name'],
        last_name: response.data['familyName'],
        email: response.data['email'],
      },
    }).then((res) => {
      console.log("sent POST request")
      console.log(res)
      localStorage.setItem('emp_id', res.data['id']);
    });
  }, []);

  const getUserDetails = () => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + localStorage.getItem('access_token')
    }).then((response) => {
      console.log("got user details", response);
      sendPostRequest(response);
    }).catch((error) => {
      console.log("user detail error, ", error);
    })
  }

  const generateAccessToken = (refreshToken) => {
    const form_data = new FormData();
    form_data.append('client_id', "934727266600-emgtd9lgqg020ave1fklhjma6ltl5tsg.apps.googleusercontent.com");
    form_data.append('client_secret', "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");
    form_data.append('refresh_token', refreshToken);
    form_data.append('grant_type', 'refresh_token');
    axios({
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      data: form_data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      // localStorage.setItem('refresh_token', res.data.refresh_token);
      // localStorage.setItem('expiry_time', res.data.expires_in);
      // localStorage.setItem('datetime', new Date().getTime());
      console.log("generated access token from refresh token", res);
      navigate('/dashboard');
    });
  }

  const getRefreshToken = (response) => {
    console.log("getting new refresh and access tokens");
    const form_data = new FormData();
    form_data.append('code', response.code)
    form_data.append('client_id', '934727266600-emgtd9lgqg020ave1fklhjma6ltl5tsg.apps.googleusercontent.com');
    form_data.append('client_secret', "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");
    form_data.append('redirect_uri', 'http://localhost:3000');
    form_data.append('grant_type', 'authorization_code');
    axios({
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      data: form_data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('expiry_time', res.data.expires_in);
      localStorage.setItem('datetime', new Date().getTime());
      console.log("in get refresh token ", res);
      getUserDetails();
      navigate('/dashboard');
    }).catch((error) => {
      console.log("couldn't get tokens", error);
    }); 
  }

  const navigate = useNavigate();
  const onSuccess = (response) => {
    getRefreshToken(response);
    console.log(response)
  };

  const onFailure = () => {};

  return (
    <Box className="landingPageBox">
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
          responseType="code"
          accessType="offline"
          buttonText="Sign In"
          // uxMode="popup"
          onSuccess={onSuccess}
          onFailure={onFailure}
          // cookiePolicy="http://localhost:3000"
          style={{ marginTop: '1em' }}
          // isSignedIn={true}
          prompt="consent"
        />
      </div>
    </Box>
  );
}

export default LandingPage;
