'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Props {
  param: string;
  items: string[];
}

const OptionsPills = ({ param, items }: Props) => {
  const { saveState, loadState } = useLocalStorage('guest');
  const localStorage = loadState();
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    setSelected(localStorage[param]);
  }, []);

  const handleClick = (item: string) => () => {
    setSelected(item);
    saveState({ [param]: item });
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      {items.map(item => {
        const active = selected === item;
        return (
          <Grid item key={item}>
            <Button
              size="large"
              endIcon={active && <DoneIcon />}
              variant={active ? 'contained' : 'outlined'}
              color={active ? 'primary' : 'inherit'}
              onClick={handleClick(item)}
              sx={{
                height: 48,
                borderRadius: 8,
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

export default OptionsPills;
