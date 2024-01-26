'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { useCallback } from 'react';

const FoodsTabs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Tabs
      value={pathname}
      textColor="secondary"
      indicatorColor="secondary"
      sx={{
        '& .MuiTabs-flexContainer': {
          gap: 3,
        },
      }}
    >
      <Tab
        label="All"
        component={Link}
        href={'/foods' + '?' + createQueryString('category', category || '')}
        value="/foods"
        sx={{ px: 0, minWidth: 'auto' }}
      />
      <Tab
        label="Recommended"
        component={Link}
        href={
          '/foods/recommended' +
          '?' +
          createQueryString('category', category || '')
        }
        value="/foods/recommended"
        sx={{ px: 0, minWidth: 'auto' }}
      />
    </Tabs>
  );
};

export default FoodsTabs;
