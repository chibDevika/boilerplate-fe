import React, { useState, useCallback } from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import DateTimePickerComponent from './DateTimePicker';
import MyCalendar from './Calendar';
import axios from './axiosInstance';
import { validateAccessToken } from './ValidateToken';

function HomePage() {
  const [reason, setReason] = useState(' ');
  const [start, setStartDate] = useState(moment());
  const [end, setEndDate] = useState(moment());
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const sendRequest = useCallback((startDate, endDate) => {
    axios({
      method: 'post',
      url: 'leaves/leaves/',
      data: {
        employee: localStorage.getItem('emp_id'),
        started_at: startDate,
        ended_at: endDate,
        reason: { reason }['reason'],
      },
    });
  }, []);

  const saveLeave = () => {
    if (localStorage.getItem('access_token')) {
      const response = validateAccessToken();
      response
        .then(() => {
          sendRequest(moment(start).format('YYYY-MM-DD HH:mm:ss'), moment(end).format('YYYY-MM-DD HH:mm:ss'));
        })
        .catch(() => {
          logout();
    });
    } else {
      logout();
    }
  };

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
            <Grid item xs={3} className="logout" margin="auto">
              <Button variant="outlined" startIcon={<GoogleIcon />} onClick={logout}>
                Sign Out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box>
        <div className="inputs">
          <Typography variant="h6">Start Date and Time</Typography>
          <DateTimePickerComponent
            date={start}
            updateDate={start => setStartDate(moment(start))} />   
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">End Date and Time</Typography>
          <DateTimePickerComponent
            date={end}
            updateDate={end => setEndDate(moment(end))}
          />
        </div>
        <div className="inputs">
          <Typography variant="h6">Reason</Typography>
          <TextField
            id="outlined-basic"
            label="Mention your reason"
            variant="outlined"
            onChange={(input) => {
              setReason(input.target.value);
            }}
          />
        </div>
        <Button variant="contained" onClick={saveLeave}>
          Save Leave
        </Button>
      </Box>
      <Box sx={{ flexGrow: 2 }} margin="auto" mt={8}>
        <MyCalendar />
      </Box>
    </div>
  );
}

export default HomePage;
