'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
interface Props {
  param: string;
  items: { value: number | string; label: string }[];
  col?: 'auto' | number;
  data: any;
}

const Options = ({ param, data, items, col = 12 }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    data[param].toString(),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      {items.map(({ label, value }, index) => {
        const cehcked = selectedOption === value;
        return (
          <Grid item xs={col} key={index}>
            <input
              type="radio"
              name={param}
              id={label}
              value={value}
              checked={cehcked}
              onChange={handleChange}
              required
              style={{
                position: 'absolute',
                clip: 'rect(0,0,0,0)',
                pointerEvents: 'none',
              }}
            />
            <Button
              size="large"
              endIcon={cehcked && <DoneIcon />}
              variant={cehcked ? 'contained' : 'outlined'}
              color={cehcked ? 'primary' : 'inherit'}
              fullWidth={col === 12}
              component="label"
              htmlFor={label}
              sx={{
                height: 48,
                lineHeight: 1.2,
                textAlign: 'center',
                fontWeight: 'medium',
                justifyContent: 'space-between',
              }}
            >
              {label}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Options;
