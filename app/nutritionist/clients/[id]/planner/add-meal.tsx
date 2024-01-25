'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

interface Props {
  day: number;
  label: string;
  category: string;
}

const AddMeal = ({ day, label, category }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: { name: string; value: string }[]) => {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      params.forEach(param => {
        urlSearchParams.delete(param.name);
        urlSearchParams.set(param.name, param.value);
      });

      return urlSearchParams.toString();
    },
    [searchParams],
  );

  return (
    <Button
      variant="outlined"
      color="inherit"
      fullWidth
      startIcon={<AddIcon />}
      component={Link}
      href={
        pathname +
        '?' +
        createQueryString([
          { name: 'day', value: day.toString() },
          { name: 'category', value: category },
        ])
      }
      sx={{
        height: 72,
        fontWeight: 400,
        color: 'text.secondary',
        borderStyle: 'dashed',
        borderColor: 'action.disabled',
      }}
    >
      Add {label}
    </Button>
  );
};

export default AddMeal;
