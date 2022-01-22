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
      <Box display="flex" p={2} alignItems="center" className="navBar">
        <Typography variant="h5" padding={1}>SquadStack Leave Manager</Typography>
        <Box flexGrow={1} textAlign="right">
          <Button variant="contained" startIcon={<GoogleIcon />} onClick={logout}>
            Sign Out
          </Button>
        </Box>
      </Box>

      <Box p={2} margin="auto">
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
