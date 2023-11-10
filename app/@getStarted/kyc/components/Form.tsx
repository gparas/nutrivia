'use client';

import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBackRounded';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import { useFormState } from './FormContext';

type Props = {
  children: ReactNode;
} & BoxProps;

const Form = ({ children, ...other }: Props) => {
  const { activeStep, onHandleBack } = useFormState();

  return (
    <Box
      component="form"
      sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
      {...other}
    >
      {children}
      <Typography component="div" variant="caption" align="center" mt={3}>
        We use this information to calculate and provide you with daily
        personalized recommendations.
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={{ xs: 'auto', sm: 8 }}
      >
        <Button
          color="inherit"
          startIcon={<ArrowBack />}
          sx={{ fontWeight: 'regular' }}
          disabled={activeStep === 0}
          onClick={() => onHandleBack()}
        >
          Back
        </Button>
        <Button
          type="submit"
          size="large"
          variant="contained"
          endIcon={<ArrowNext />}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
