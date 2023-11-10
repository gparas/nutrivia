'use client';

import dynamic from 'next/dynamic';
import Stepper from './components/Stepper';
import { useFormState } from './components/FormContext';

const Gender = dynamic(() => import('./steps/Gender'));
const Height = dynamic(() => import('./steps/Height'));
const Weight = dynamic(() => import('./steps/Weight'));
const TargetWeight = dynamic(() => import('./steps/TargetWeight'));
const Age = dynamic(() => import('./steps/Age'));
const Activity = dynamic(() => import('./steps/Activity'));
const Diet = dynamic(() => import('./steps/Diet'));

const steps = [Gender, Height, Weight, TargetWeight, Age, Activity, Diet];

const KeysPage = () => {
  const { activeStep } = useFormState();

  const Component = steps[activeStep];

  return (
    <>
      <Stepper activeStep={activeStep} steps={steps.map((_, i) => i)} />
      <Component />
    </>
  );
};

export default KeysPage;
