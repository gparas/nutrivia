'use client';

import dynamic from 'next/dynamic';
import Stepper from './components/Stepper';
import { useForm } from './components/FormContext';

const Gender = dynamic(() => import('./steps/Gender'));
const Height = dynamic(() => import('./steps/Height'));
const TargetWeight = dynamic(() => import('./steps/TargetWeight'));
const Age = dynamic(() => import('./steps/Age'));
const Activity = dynamic(() => import('./steps/Activity'));
const Diet = dynamic(() => import('./steps/Diet'));

const steps = [Gender, Height, TargetWeight, Age, Activity, Diet];

const KeysPage = () => {
  const { activeStep } = useForm();

  const Component = steps[activeStep];
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps.map((_, i) => i)} />
      <Component />
    </>
  );
};

export default KeysPage;
