import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from './axiosInstance';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar(props) {
  const EventComponent = () => {
    axios({
      method: 'get',
      url: 'leaves/leaves/',
    }).then((response) => {
      const data = response.data;
      const len = data.length;
      const events = [];
      for (let i = 0; i < len; i++) {
        const startTemp = data[i]['started_at'];
        const startStr = startTemp.substr(0,10) + " " + startTemp.substr(11,8);

        const endTemp = data[i]['ended_at'];
        const endStr = endTemp.substr(0,10) + " " + endTemp.substr(11,8);

        events.push({
          start: new Date(startStr),
          end: new Date(endStr),
          title: data[i]['first_name'] + " " + data[i]['last_name'] + " Reason:" + data[i]['reason'],
        });
      }
      return events;
    });
  };

  const Events = EventComponent();
  const temp = [{ start: new Date(), end: new Date(), title: "special event" }];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={temp}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}

export default MyCalendar;
