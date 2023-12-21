'use client';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const Age = ({ age }: { age: number | null }) => {
  const defaultValue = age ? dayjs().year(age) : null;
  const [value, setValue] = useState<Dayjs | null>(defaultValue);
  const minDate = dayjs().subtract(70, 'year');
  const maxDate = dayjs().subtract(20, 'year');
  console.log(value?.year());
  return (
    <>
      <DatePicker
        label="Year of birth"
        views={['year']}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={newValue => setValue(newValue)}
      />
      <input type="hidden" name="age" value={dayjs(value).year()} />
    </>
  );
};

export default Age;
