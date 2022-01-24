import React, { useState, useCallback } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    });
  }, []);

  const saveLeave = useCallback(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
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
  }, []);

  return (
    <div>
      <Box className="navBar">
        <Typography variant="h5" className="titleText">
          <Box className="title">
            SquadStack Leave Manager
          </Box>
        </Typography>
        <Box flexGrow={1} textAlign="right">
          <Button variant="contained" startIcon={<GoogleIcon />} onClick={logout}>
            Sign Out
          </Button>
        </Box>
      </Box>

      <Box p={2} className="bodyBox">
        <div className="inputs">
          <Typography variant="h6" margin={1}>Start Date and Time</Typography>
          <DateTimePickerComponent
            date={start}
            updateDate={start => setStartDate(moment(start))} />   
        </div>
        <div className="inputs">
          <Typography variant="h6" my={1} mx={1.5}>End Date and Time</Typography>
          <DateTimePickerComponent
            date={end}
            updateDate={end => setEndDate(moment(end))}
          />
        </div>
        <div className="inputs">
          <Typography variant="h6" my={1} mx={8}>Reason</Typography>
          <TextField
            id="outlined-basic"
            label="Mention your reason"
            variant="outlined"
            onChange={(input) => {
              setReason(input.target.value);
            }}
          />
        </div>
      </Box>
      <Box>
        <Button variant="contained" onClick={saveLeave} className="saveButton">
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
