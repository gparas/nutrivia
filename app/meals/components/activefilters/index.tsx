'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ActiveFilters = () => {
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

  if (!Object.keys(params).length) {
    return null;
  }
  return (
    <Stack direction="row" spacing={1} mb={2}>
      {Object.keys(params)
        .filter(key => key !== 'category')
        .map(key => (
          <Chip
            key={key}
            label={`${key}: ${params[key]}`}
            variant="outlined"
            onDelete={() => handleDelete(key)}
          />
        ))}
    </Stack>
  );
};

export default ActiveFilters;
