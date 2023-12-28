'use client';

import dynamic from 'next/dynamic';
import Stepper from './components/Stepper';
import { useFormContext } from './components/FormContext';
import Loader from '@/components/page-loader';

const Goal = dynamic(() => import('./steps/Goal'), {
  loading: () => <Loader />,
});
const Gender = dynamic(() => import('./steps/Gender'), {
  loading: () => <Loader />,
});
const Height = dynamic(() => import('./steps/Height'), {
  loading: () => <Loader />,
});
const Weight = dynamic(() => import('./steps/Weight'), {
  loading: () => <Loader />,
});
const TargetWeight = dynamic(() => import('./steps/TargetWeight'), {
  loading: () => <Loader />,
});
const Age = dynamic(() => import('./steps/Age'), {
  loading: () => <Loader />,
});
const Activity = dynamic(() => import('./steps/Activity'), {
  loading: () => <Loader />,
});
const FoodPreference = dynamic(() => import('./steps/FoodPreference'), {
  loading: () => <Loader />,
});
const Overview = dynamic(() => import('./steps/Overview'), {
  loading: () => <Loader />,
});

const steps = [
  { id: 'goal', component: Goal },
  { id: 'gender', component: Gender },
  { id: 'height', component: Height },
  { id: 'weight', component: Weight },
  { id: 'target_weight', component: TargetWeight },
  { id: 'age', component: Age },
  { id: 'activity', component: Activity },
  { id: 'food_preference', component: FoodPreference },
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
