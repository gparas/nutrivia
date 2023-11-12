'use client';

import React, { PropsWithChildren } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

const Localization = ({ children }: PropsWithChildren) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      {children}
    </LocalizationProvider>
  );
};

export default Localization;
