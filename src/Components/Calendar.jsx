import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { validateAccessToken } from '../utils/ValidateToken';
import { startDate } from '../utils/startDate';
import { endDate } from '../utils/endDate';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  function convert(str) {
    const date = new Date(str);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }

  const getEvents = useCallback((start, end) => {
    const token = 'Token ';
    axios({
      method: 'get',
      url: 'leaves/leaves/' + start + '/' + end,
      headers: {
        Authorization: `${token}` + localStorage.getItem('token'),
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
          title:
            data[i].first_name +
            ' ' +
            data[i].last_name +
            '; Reason:' +
            data[i].reason,
        });
      }
      setMyEvents(events);
    });
  }, []);

  const handleRangeChange = useCallback(
    (event) => {
      const startDateString = convert(event.start.toString());
      const endDateString = convert(event.end.toString());
      getEvents(startDateString, endDateString);
    },
    [getEvents],
  );

  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

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

  useEffect(() => {
    updateCalendar();
  }, [updateCalendar]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onRangeChange={handleRangeChange}
      />
    </div>
  );
}

export default MyCalendar;
