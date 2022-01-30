import * as React from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MomentUtils from '@date-io/moment';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function DateTimePickerComponent(props) {
  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        /* eslint-disable */
        value={props.date}
        onChange={(value) => {
          props.updateDate(value);
        }}
      />
    </LocalizationProvider>
  );
}
