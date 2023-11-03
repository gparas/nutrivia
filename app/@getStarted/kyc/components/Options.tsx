'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
interface Props {
  param: string;
  items: string[];
  col?: 'auto' | number;
}

const Options = ({ param, items, col = 12 }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      {items.map(item => {
        const cehcked = selectedOption === item;
        return (
          <Grid item xs={col} key={item}>
            <input
              type="radio"
              name={param}
              id={item}
              value={item}
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
              htmlFor={item}
              sx={{
                height: 48,
                lineHeight: 1.2,
                textAlign: 'center',
                fontWeight: 'medium',
                justifyContent: 'space-between',
              }}
            >
              {item}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Options;
