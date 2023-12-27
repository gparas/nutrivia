'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@/components/card';
import Filter from './filter';
import { KCAL, MEAL_TYPES } from './constants';

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlParams = new URLSearchParams(searchParams);
  const entries = urlParams.entries();
  const params = Object.fromEntries(entries);

  const removeQueryParam = useCallback(
    (param: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(param);

      return params.toString();
    },
    [searchParams],
  );

  const handleDelete = (param: string) => {
    router.push(pathname + '?' + removeQueryParam(param));
  };
  return (
    <Card spacing={1} mb={3}>
      <Stack direction="row" spacing={1}>
        <Filter name="category" options={MEAL_TYPES} label="Category" />
        <Filter name="kcal" options={KCAL} label="Kcal" />
      </Stack>
      {Object.keys(params).length ? (
        <Stack direction="row" spacing={1}>
          {Object.keys(params).map(key => (
            <Chip
              key={key}
              label={`${key}: ${params[key]}`}
              variant="outlined"
              onDelete={() => handleDelete(key)}
            />
          ))}
        </Stack>
      ) : null}
    </Card>
  );
};

export default Filters;
