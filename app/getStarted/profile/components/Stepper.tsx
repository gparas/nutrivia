'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
interface Props {
  activeStep: number;
  steps: number[];
}

const Stepper = ({ activeStep, steps }: Props) => {
  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" mb={5}>
      {steps.map(index => {
        const active = activeStep === index;
        return (
          <Box
            key={index}
            sx={[
              {
                width: 30,
                height: 6,
                borderRadius: 4,
                bgcolor: 'action.selected',
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
