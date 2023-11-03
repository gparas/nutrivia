'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBackRounded';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import U from './utils';
import axios from 'axios';

interface Props {
  children: ReactNode;
  onChangeData(value: object): void;
  handleNext(): void;
  handleBack(): void;
  activeStep: number;
  isLastStep: boolean;
  data: object;
}

const Form = ({
  children,
  onChangeData,
  handleNext,
  handleBack,
  activeStep,
  isLastStep,
  data,
}: Props) => {
  const router = useRouter();
  const postData = (payload: object) => {
    axios
      .post('/api/kyc', payload)
      .then(res => {
        console.log(res);
        router.push('/');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElemnts = event.currentTarget;
    const value = U.getFormDataObj(formElemnts);
    onChangeData(value);
    if (isLastStep) {
      console.log({ ...data, ...value });
      const payload = { ...data, ...value };
      postData(payload);
      return;
    }
    handleNext();
  };
  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
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
          onClick={() => handleBack()}
        >
          Back
        </Button>
        <Button
          type="submit"
          size="large"
          variant="contained"
          endIcon={<ArrowNext />}
        >
          {isLastStep ? 'Save' : 'Next'}
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
