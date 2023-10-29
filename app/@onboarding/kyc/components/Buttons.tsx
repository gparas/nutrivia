'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBackRounded';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import C from '../constants';
import U from './utils';

const Buttons = () => {
  const pathname = usePathname();
  const currentItem = U.getCurrentPathname(pathname);
  const nextItem = U.getNextPathname(pathname);
  const prevItem = U.getPrevPathname(pathname);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button
        color="inherit"
        disabled={currentItem === C.STEPS[0]}
        startIcon={<ArrowBack />}
        component={NextLink}
        href={`/kyc/${prevItem}`}
        sx={{ fontWeight: 'regular' }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        size="large"
        component={NextLink}
        href={`/kyc/${nextItem}`}
        endIcon={<ArrowNext />}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Buttons;
