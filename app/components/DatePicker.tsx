'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';

const DatePicker = ({ ...other }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <MuiDatePicker {...other} />
    </LocalizationProvider>
  );
};

export default DatePicker;
