'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBackRounded';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import styles from './styles';

const Goal = dynamic(() => import('./steps/Goal'));
const Gender = dynamic(() => import('./steps/Gender'));
const BodyMass = dynamic(() => import('./steps/BodyMass'));
const IdealWeight = dynamic(() => import('./steps/IdealWeight'));
const Activity = dynamic(() => import('./steps/Activity'));
const Diet = dynamic(() => import('./steps/Diet'));

const steps = [
  {
    title: 'What is your goal?',
    step: Goal,
  },
  {
    title: 'What is your gender?',
    step: Gender,
  },
  {
    title: 'What is your height and weight?',
    step: BodyMass,
  },
  {
    title: 'What is your ideal weight?',
    step: IdealWeight,
  },
  {
    title: 'What is your level of activity?',
    step: Activity,
  },
  {
    title: 'What types of diet do you prefer?',
    step: Diet,
  },
];

const KycPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const Component = steps[activeStep].step;
  const title = steps[activeStep].title;
  return (
    <>
      <Stack direction="row" spacing={0.75} mt={3} justifyContent="center">
        {steps.map((_, index) => {
          const active = activeStep === index;
          return <Box key={index} sx={styles.step(active)} />;
        })}
      </Stack>
      <Box my={6}>
        <Typography variant="h4" fontWeight={600} mb={7} align="center">
          {title}
        </Typography>
        <Component />
        <Typography component="div" variant="caption" align="center" mt={3}>
          We use this information to calculate and provide you with daily
          personalized recommendations.
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack />}
          sx={{ fontWeight: 'regular' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleNext}
          endIcon={<ArrowNext />}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </>
  );
};

export default KycPage;
