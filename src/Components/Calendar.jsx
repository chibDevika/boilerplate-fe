import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { validateAccessToken } from './ValidateToken';

const localizer = momentLocalizer(moment);

function myCalendar() {
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateCalendar();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const updateCalendar = () => {
    if (localStorage.getItem('access_token')) {
      const response = validateAccessToken();
      response
        .then(() => {
          getEvents();
        }).catch(() => {
          logout();
        });
    } else {
      logout();
    }
  };

  const getEvents = useCallback(() => {
    axios({
      method: 'get',
      url: 'leaves/leaves/',
    }).then((response) => {
      const data = response.data;
      const len = data.length;
      const events = [];
      for (let i = 0; i < len; i++) {
        const startTemp = data[i]['started_at'];
        const startStr =
          startTemp.substr(0, 10) + ' ' + startTemp.substr(11, 8);

        const endTemp = data[i]['ended_at'];
        const endStr = endTemp.substr(0, 10) + ' ' + endTemp.substr(11, 8);

        events.push({
          start: new Date(startStr),
          end: new Date(endStr),
          title:
            data[i]['first_name'] + ' ' + data[i]['last_name'] + '; Reason:' + data[i]['reason'],
        });
      }
      setMyEvents(events);
    });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}

export default myCalendar;
