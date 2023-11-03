'use client';

import { useState } from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

interface Props {
  param: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

const InputSlider = ({
  param,
  unit,
  min,
  value: valueFromProps,
  max,
}: Props) => {
  const [value, setValue] = useState<number>(valueFromProps);

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
