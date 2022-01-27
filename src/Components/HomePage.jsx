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
import { validateAccessToken } from '../utils/ValidateToken';

function HomePage() {
  const [reason, setReason] = useState(' ');
  const [start, setStartDate] = useState(moment());
  const [end, setEndDate] = useState(moment());
  const [buttonClick, setButtonClick] = useState(false);
  const [responseText, setResponseText] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const sendRequest = useCallback((startDate, endDate, newReason) => {
    axios({
      method: 'post',
      url: 'leaves/leaves/',
      data: {
        employee: localStorage.getItem('emp_id'),
        started_at: startDate,
        ended_at: endDate,
        reason: newReason,
      },
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((result) => {
        setButtonClick(true);
        setResponseText('Saved leave successfully!');
      })
      .catch((error) => {
        setButtonClick(true);
        setResponseText(error.response.data.non_field_errors.toString());
      });
  }, []);

  const saveLeave = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const response = validateAccessToken();
      response
        .then(() => {
          sendRequest(
            moment(start).format('YYYY-MM-DD HH:mm:ss'),
            moment(end).format('YYYY-MM-DD HH:mm:ss'),
            { reason }.reason,
          );
        })
        .catch(() => {
          logout();
        });
    } else {
      logout();
    }
  };

  return (
    <div className="homePageDiv">
      <Box className="navBar">
        <Typography variant="h5">
          <div className="nameAndLogo">
            <Box className="logo" />
            <Box className="title">SquadStack Leave Manager</Box>
          </div>
        </Typography>
        <Box flexGrow={1} textAlign="right">
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={logout}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      <Box p={2} className="bodyBox">
        <div className="inputs">
          <Typography variant="h6" margin={1}>
            Start Date and Time
          </Typography>
          <DateTimePickerComponent
            date={start}
            updateDate={(start) => setStartDate(moment(start))}
          />
        </div>
        <div className="inputs">
          <Typography variant="h6" my={1} mx={1.5}>
            End Date and Time
          </Typography>
          <DateTimePickerComponent
            date={end}
            updateDate={(end) => setEndDate(moment(end))}
          />
        </div>
        <div className="inputs" mt={2}>
          <Typography variant="h6" my={1} mx={8}>
            Reason
          </Typography>
          <TextField
            id="outlined-basic"
            label="Mention your reason"
            variant="outlined"
            multiline
            onChange={(input) => {
              setReason(input.target.value);
            }}
          />
        </div>
      </Box>
      <Box className="errorMessage" my={2} mx={35}>
        {{
          buttonClick,
        } ? (
          <Typography>{responseText}</Typography>
        ) : null}
      </Box>
      <Box>
        <Button variant="contained" onClick={saveLeave} className="saveButton">
          Save Leave
        </Button>
      </Box>
      <Box className="calendar">
        <MyCalendar />
      </Box>
    </div>
  );
}

export default HomePage;
