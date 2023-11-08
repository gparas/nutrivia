'use client';

import { useState } from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

interface Props {
  param: string;
  unit: string;
  min: number;
  max: number;
  data: any;
}

const InputSlider = ({ param, unit, min, max, data }: Props) => {
  const [value, setValue] = useState<number>(data[param]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <>
      <FormControl sx={{ mb: 2, width: 100, mx: 'auto', display: 'block' }}>
        <OutlinedInput
          id={param}
          name={param}
          readOnly
          value={value}
          endAdornment={
            unit && <InputAdornment position="end">{unit}</InputAdornment>
          }
          inputProps={{
            'aria-label': param,
          }}
        />
      </FormControl>
      <Slider
        aria-label={param}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </>
  );
};

export default InputSlider;
