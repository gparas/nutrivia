'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import ComponentLoader from '@/components/component-loader';
import Card from '@/components/card';
import { alpha } from '@mui/material';

const steps = [
  {
    label: 'General info',
    content: dynamic(() => import('./info'), {
      loading: () => <ComponentLoader height={300} />,
    }),
  },
  {
    label: 'Upload Image',
    content: dynamic(() => import('./image'), {
      loading: () => <ComponentLoader height={300} />,
    }),
  },
  {
    label: 'Nutritional information',
    content: dynamic(() => import('./macros'), {
      loading: () => <ComponentLoader height={300} />,
    }),
  },
];

const AddForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    kcal: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  const handleClickNext = (data: {}) => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setData(prevData => ({ ...prevData, ...data }));
  };

  const handleClickBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Card mt={2}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          '& .MuiStepConnector-line': {
            borderColor: theme => alpha(theme.palette.text.primary, 0.2),
          },
        }}
      >
        {steps.map(step => {
          const Component = step.content;
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent
                sx={{
                  borderLeftColor: theme =>
                    alpha(theme.palette.text.primary, 0.2),
                }}
              >
                <Component
                  initData={data}
                  onClickNext={handleClickNext}
                  onClickBack={handleClickBack}
                />
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Card>
  );
};

export default AddForm;
