'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Props {
  param: string;
  items: string[];
}

const Options = ({ param, items }: Props) => {
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
    <Stack spacing={3}>
      {items.map(item => {
        const active = selected === item;
        return (
          <Button
            key={item}
            size="large"
            endIcon={active && <DoneIcon />}
            variant={active ? 'contained' : 'outlined'}
            color={active ? 'primary' : 'inherit'}
            onClick={handleClick(item)}
            sx={{
              height: 56,
              borderRadius: 1.5,
              fontWeight: active ? 'bold' : 'medium',
              justifyContent: 'space-between',
            }}
          >
            {item}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Options;
