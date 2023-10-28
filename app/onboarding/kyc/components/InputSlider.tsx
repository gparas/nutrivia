import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import useSearchQueryParams from '@/hooks/useSearchQueryParams';

interface Props {
  param: string;
  unit: string;
  value: number;
  min: number;
  max: number;
}

const InputSlider = ({ param, unit, value: valueProp, min, max }: Props) => {
  const { query, updateSearchParams } = useSearchQueryParams(param);
  const initValue = query ? parseInt(query) : valueProp;
  const [value, setValue] = useState<number>(initValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    updateSearchParams(newValue.toString());
  };

  return (
    <Box mb={6}>
      <FormControl sx={{ mb: 2, width: 100, mx: 'auto', display: 'block' }}>
        <OutlinedInput
          id="height"
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
        onChangeCommitted={handleChangeCommitted}
        min={min}
        max={max}
      />
    </Box>
  );
};

export default InputSlider;
