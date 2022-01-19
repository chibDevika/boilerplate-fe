import * as React from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MomentUtils from '@date-io/moment';

export default function DateTimePickerComp() {
  const [value, setValue] = React.useState(new Date());
    

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
