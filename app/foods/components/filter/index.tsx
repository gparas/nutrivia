'use client';

import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';

interface Props {
  name: string;
  label: string;
  options: {
    label: string;
    value: string | number;
  }[];
}

const Filter = ({ name, label, options }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get(name);
  const [value, setValue] = useState(category);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    const category = searchParams.get(name);
    setValue(category);
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const name = (event.target as HTMLInputElement).name;
    setValue(value);
    router.push(pathname + '?' + createQueryString(name, value));
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? `${name}-popover` : undefined;
  return (
    <>
      <Button
        aria-describedby={id}
        variant="text"
        color="inherit"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{ fontWeight: 500 }}
      >
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <RadioGroup
          value={value}
          onChange={handleChange}
          name={name}
          aria-labelledby={name}
          sx={{ p: 2 }}
        >
          {options.map(option => (
            <FormControlLabel
              key={option.label}
              control={<Radio />}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </Popover>
    </>
  );
};

export default Filter;
