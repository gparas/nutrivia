'use client';

import dynamic from 'next/dynamic';
import Stepper from './components/Stepper';
import { useFormContext } from './components/FormContext';

const Goal = dynamic(() => import('./steps/Goal'));
const Gender = dynamic(() => import('./steps/Gender'));
const Height = dynamic(() => import('./steps/Height'));
const Weight = dynamic(() => import('./steps/Weight'));
const TargetWeight = dynamic(() => import('./steps/TargetWeight'));
const Age = dynamic(() => import('./steps/Age'));
const Activity = dynamic(() => import('./steps/Activity'));
const Diet = dynamic(() => import('./steps/Diet'));
const Overview = dynamic(() => import('./steps/Overview'));

const steps = [
  { id: 'goal', component: Goal },
  { id: 'gender', component: Gender },
  { id: 'height', component: Height },
  { id: 'weight', component: Weight },
  { id: 'target_weight', component: TargetWeight },
  { id: 'age', component: Age },
  { id: 'activity', component: Activity },
  { id: 'diet', component: Diet },
  { id: 'overview', component: Overview },
];

const KeysPage = () => {
  const { activeStep, data } = useFormContext();

  const filteredSteps =
    data.goal === 'maintain_weight'
      ? steps.filter(item => item.id !== 'target_weight')
      : steps;

  const Component = filteredSteps[activeStep].component;
  return (
    <>
      <Stepper activeStep={activeStep} steps={filteredSteps.map((_, i) => i)} />
      <Component />
    </>
  );
};

export default KeysPage;
