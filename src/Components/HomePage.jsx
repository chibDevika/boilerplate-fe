import React, { useState } from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import DateTimePickerComp from './DateTimePicker';
import MyCalendar from './Calendar';

function HomePage() {
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const onSuccess = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // const saveLeave = ((response) => {
  //   axios({
  //     method: 'post',
  //     url: 'leaves/leaves/',
  //     data: {
  //       employee: ,
  //       started_at: ,
  //       ended_at: ,
  //       reason: ,
  //     },
  //   }).then((res) => {
  //     return res.id;
  //   });
  // });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={20}>
            <Grid item xs={5} margin="auto" marginLeft={0}>
              <Typography variant="h5" gutterBottom component="div" padding={1}>
                SquadStack Leaves Manager
              </Typography>
            </Grid>
            <Grid item xs={3} className="logoutButton" margin="auto">
              <GoogleLogout
                clientId={process.env.REACT_APP_CLIENT_ID}
                hostedDomain="squadstack.com"
                buttonText="Sign Out"
                onLogoutSuccess={onSuccess}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          mx: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Start Date and Time</Typography>
          <DateTimePickerComp />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">End Date and Time</Typography>
          <DateTimePickerComp />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Reason</Typography>
          <TextField
            id="outlined-basic"
            label="Mention your reason"
            variant="outlined"
            onChange={(input) => {
              setReason(input)
            }}
          />
        </div>
        <Button variant="contained">Save Leave</Button>
      </Box>
      <Box sx={{ flexGrow: 2 }} margin="auto" mt={8}>
        <MyCalendar />
      </Box>
    </div>
  );
}

export default HomePage;
