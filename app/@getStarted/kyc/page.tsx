'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stepper from './components/Stepper';
import Form from './components/Form';

const Goal = dynamic(() => import('./steps/Goal'));
const Gender = dynamic(() => import('./steps/Gender'));
const Height = dynamic(() => import('./steps/Height'));
const Weight = dynamic(() => import('./steps/Weight'));
const Activity = dynamic(() => import('./steps/Activity'));
const Diet = dynamic(() => import('./steps/Diet'));

const steps = [Goal, Gender, Height, Weight, Activity, Diet];

const KeysPage = () => {
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  function handleNext(): void {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack(): void {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleChangeData(value: object): void {
    setData(prevState => ({
      ...prevState,
      ...value,
    }));
  }

  const Component = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps.map((_, i) => i)} />
      <Form
        onChangeData={handleChangeData}
        handleNext={handleNext}
        handleBack={handleBack}
        activeStep={activeStep}
        isLastStep={isLastStep}
        data={data}
      >
        <Component />
      </Form>
    </>
  );
};

export default KeysPage;
