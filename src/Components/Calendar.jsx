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
import { validateAccessToken } from '../utils/ValidateToken';
import { startDate } from '../utils/startDate';
import { endDate } from '../utils/endDate';
import DateTimePickerComponent from './DateTimePicker';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [myEvents, setMyEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [selected, setSelected] = useState();
  const handleClose = useCallback(() => {
    setButtonClick(false);
    setResponseText('');
    setOpen(false);
  }, []);
  const [reason, setReason] = useState(' ');
  const [start, setStartDate] = useState(moment());
  const [end, setEndDate] = useState(moment());
  const [leaveID, setLeaveID] = useState();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  function refreshPage() {
    window.location.reload(false);
  }

  const removeErrorMessage = useCallback(() => {
    setTimeout(() => {
      setButtonClick(false);
      setResponseText('');
    }, 10000);
  }, []);

  const removeSuccessMessage = useCallback(() => {
    setTimeout(() => {
      setButtonClick(false);
      setResponseText('');
      handleClose();
      refreshPage();
    }, 2000);
  }, [handleClose]);

  function convert(str) {
    const date = new Date(str);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }

  const getEvents = useCallback(
    (starting, ending) =>
      axios({
        method: 'get',
        url: `leaves/leaves/${starting}/${ending}`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        const { data } = response;
        const len = data.length;
        const events = [];
        for (let i = 0; i < len; i++) {
          const startTemp = data[i].started_at;
          const startStr = `${startTemp.substr(0, 10)} ${startTemp.substr(
            11,
            8,
          )}`;

          const endTemp = data[i].ended_at;
          const endStr = `${endTemp.substr(0, 10)} ${endTemp.substr(11, 8)}`;

          events.push({
            start: new Date(startStr),
            end: new Date(endStr),
            id: data[i].id,
            title: `${data[i].first_name} ${data[i].last_name}; Reason: ${data[i].reason}`,
          });
        }
        setMyEvents(events);
      }),
    [],
  );

  const handleRangeChange = useCallback(
    (event) => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const response = validateAccessToken();
        response.then(() => {
          const startDateString = convert(event.start.toString());
          const endDateString = convert(event.end.toString());
          getEvents(startDateString, endDateString);
        });
      } else {
        logout();
      }
    },
    [getEvents, logout],
  );

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
  }, [getEvents, logout]);

  const handleSelected = useCallback((event) => {
    setSelected(event);
    setStartDate(event.start);
    setEndDate(event.end);
    setLeaveID(event.id);
    setReason(event.title.split('Reason:')[1]);
    setOpen(true);
  }, []);

  useEffect(() => {
    updateCalendar();
  }, [updateCalendar]);

  const saveChange = useCallback(
    (startingDate, endingDate, newReason) => {
      axios({
        method: 'patch',
        url: `leaves/leaves/${leaveID}/`,
        data: {
          employee: localStorage.getItem('emp_id'),
          started_at: startingDate,
          ended_at: endingDate,
          reason: newReason,
        },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then(() => {
          setButtonClick(true);
          setResponseText('Updated Leave Successfully!');
          removeSuccessMessage();
        })
        .catch((error) => {
          setButtonClick(true);
          setResponseText(error.response.data.non_field_errors.toString());
          removeErrorMessage();
        });
    },
    [leaveID, removeErrorMessage, removeSuccessMessage],
  );

  const handleReasonChange = useCallback((event) => {
    setReason(event.target.value);
  }, []);

  /* eslint-disable */
  const sendDeleteRequest = useCallback(() => {
    axios({
      method: 'patch',
      url: `leaves/leaves/${leaveID}/`,
      data: {
        started_at: start,
        ended_at: end,
        reason: reason,
        is_active: false,
      },
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setButtonClick(true);
        setResponseText('Deleted Leave Successfully!');
        removeSuccessMessage();
      })
      .catch((error) => {
        setButtonClick(true);
        setResponseText(error.response.data.non_field_errors.toString());
        removeErrorMessage();
      });
  }, [leaveID, removeErrorMessage, removeSuccessMessage, reason, start, end]);

  const handleDeleteLeave = useCallback(
    (event) => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const response = validateAccessToken();
        response.then(() => {
          sendDeleteRequest();
        });
      } else {
        logout();
      }
    },
    [sendDeleteRequest, logout],
  );

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="popup">
            <Box p={2} className="bodyBox">
              <div className="inputBox">
                <Typography variant="h6" my={1}>
                  Start Date and Time
                </Typography>
                <DateTimePickerComponent
                  date={start}
                  /* eslint-disable */
                  updateDate={(startingTime) =>
                    setStartDate(moment(startingTime))
                  }
                />
              </div>
              <div className="inputBox">
                <Typography variant="h6" my={1}>
                  End Date and Time
                </Typography>
                <DateTimePickerComponent
                  date={end}
                  updateDate={(endingTime) => setEndDate(moment(endingTime))}
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
                  onChange={handleReasonChange}
                />
              </div>
              <Box className="errorMessage">
                {{
                  buttonClick,
                } ? (
                  <Typography>{responseText}</Typography>
                ) : null}
              </Box>
              <div className="buttonDiv">
                <Box className="saveChangeButton">
                  <Button
                    onClick={() =>
                      saveChange(
                        moment(start).format('YYYY-MM-DD HH:mm:ss'),
                        moment(end).format('YYYY-MM-DD HH:mm:ss'),
                        /* eslint-disable */
                        { reason }.reason,
                      )
                    }
                    color="success"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Box>
                <Box className="deleteButton">
                  <Button
                    onClick={handleDeleteLeave}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </div>
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

export default MyCalendar;
