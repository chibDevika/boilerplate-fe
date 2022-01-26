/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from './axiosInstance';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { validateAccessToken } from './ValidateToken';
import DateTimePickerComponent from './DateTimePicker';

const localizer = momentLocalizer(moment);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function myCalendar() {
  const [myEvents, setMyEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState();
  const handleClose = () => setOpen(false);
  const [reason, setReason] = useState(' ');
  const [start, setStartDate] = useState(moment());
  const [end, setEndDate] = useState(moment());
  const [leaveID, SetLeaveID] = useState();
  const [buttonClick, setButtonClick] = useState(false);
  const [responseText, setResponseText] = useState('');
  const navigate = useNavigate();

  function startDate() {
    const date = new Date();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = '01';
    return [date.getFullYear(), month, day].join('-');
  }

  function endDate() {
    const currMonth = new Date().getMonth();
    if (currMonth === 11) {
      const date = new Date();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = '31';
      return [date.getFullYear(), month, day].join('-');
    } else {
      const date = new Date();
      const month = ('0' + (date.getMonth() + 2)).slice(-2);
      const day = '01';
      return [date.getFullYear(), month, day].join('-');
    }
  }

  function convert(str) {
    const date = new Date(str);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }

  const getEvents = useCallback((start, end) => {
    axios({
      method: 'get',
      url: 'leaves/leaves/' + start + '/' + end + '/',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      const data = response.data;
      const len = data.length;
      const events = [];
      for (let i = 0; i < len; i++) {
        const startTemp = data[i].started_at;
        const startStr =
          startTemp.substr(0, 10) + ' ' + startTemp.substr(11, 8);

        const endTemp = data[i].ended_at;
        const endStr = endTemp.substr(0, 10) + ' ' + endTemp.substr(11, 8);

        events.push({
          start: new Date(startStr),
          end: new Date(endStr),
          id: data[i].id,
          title:
            data[i].first_name +
            ' ' +
            data[i].last_name +
            '; Reason: ' +
            data[i].reason,
        });
      }
      setMyEvents(events);
    });
  }, []);

  function handleRangeChange(event) {
    const startDateString = convert(event.start.toString());
    const endDateString = convert(event.end.toString());
    getEvents(startDateString, endDateString);
  }

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const updateCalendar = useCallback(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const response = validateAccessToken();
      response.then(() => {
        getEvents(startDate(), endDate());
      });
    } else {
      logout();
    }
  });

  const handleSelected = (event) => {
    setSelected(event);
    setStartDate(event.start);
    setEndDate(event.end);
    SetLeaveID(event.id);
    setReason(event.title.split('Reason:')[1]);
    setOpen(true);
  };

  useEffect(() => {
    updateCalendar();
  }, []);

  const saveChange = useCallback((startDate, endDate, newReason) => {
    axios({
      method: 'patch',
      url: 'leaves/leaves/' + leaveID + '/',
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
        setResponseText('Updated Leave Successfully!');
      })
      .catch((error) => {
        setButtonClick(true);
        setResponseText(error.response.data.non_field_errors.toString());
      });
  });

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box id="popup">
            <Box p={2} id="bodyBox">
              <div className="inputBox">
                <Typography variant="h6" my={1}>
                  Start Date and Time
                </Typography>
                <DateTimePickerComponent
                  date={start}
                  updateDate={(start) => setStartDate(moment(start))}
                />
              </div>
              <div className="inputBox">
                <Typography variant="h6" my={1}>
                  End Date and Time
                </Typography>
                <DateTimePickerComponent
                  date={end}
                  updateDate={(end) => setEndDate(moment(end))}
                />
              </div>
              <div className="inputBox" mt={2}>
                <Typography variant="h6" my={1}>
                  Reason
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Mention your reason"
                  variant="outlined"
                  multiline
                  defaultValue={reason}
                  onChange={(input) => {
                    setReason(input.target.value);
                  }}
                />
              </div>
              <Box id="errorMessage">
                {{
                  buttonClick,
                } ? (
                  <Typography margin="auto">{responseText}</Typography>
                ) : null}
              </Box>
              <Button
                onClick={() =>
                  saveChange(
                    moment(start).format('YYYY-MM-DD HH:mm:ss'),
                    moment(end).format('YYYY-MM-DD HH:mm:ss'),
                    { reason }.reason,
                  )
                }
                variant="contained"
                id="saveChangeButton"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onRangeChange={handleRangeChange}
        selected={selected}
        onSelectEvent={handleSelected}
      />
    </div>
  );
}

export default myCalendar;
/* eslint-disable */
