'use client';

import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import C from '../constants';
import U from '../utils';

const Stepper = () => {
  const pathname = usePathname();
  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" mb={6}>
      {C.STEPS.map(step => {
        const active = U.getCurrentPathname(pathname) === step;
        return (
          <Box
            key={step}
            sx={[
              {
                width: 30,
                height: 6,
                borderRadius: 4,
                bgcolor: 'grey.300',
                transition: 'all .2s',
              },
              active && {
                width: 60,
                bgcolor: 'primary.main',
              },
            ]}
          />
        );
      })}
    </Stack>
  );
};

export default Stepper;
