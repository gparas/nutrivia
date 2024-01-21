'use client';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const AgeField = ({ age }: { age: string | null }) => {
  const defaultValue = age ? dayjs().year(Number(age)) : null;
  const [value, setValue] = useState<Dayjs | null>(defaultValue);
  const minDate = dayjs().subtract(70, 'year');
  const maxDate = dayjs().subtract(20, 'year');
  return (
    <>
      <DatePicker
        label="Year of birth"
        views={['year']}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={newValue => setValue(newValue)}
        slotProps={{
          textField: {
            required: true,
            fullWidth: true,
            color: 'secondary',
          },
        }}
      />
      <input type="hidden" name="age" value={dayjs(value).year()} />
    </>
  );
};

export default AgeField;
