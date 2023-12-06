import { PROFILE } from '@/lib/constants';
import { useFormContext } from '../components/FormContext';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const TargetWeight = () => {
  const { data } = useFormContext();

  const min =
    data.goal === 'gain_weight'
      ? Number(data.weight) + 1
      : PROFILE.target_weight.min;

  const max =
    data.goal === 'lose_weight'
      ? Number(data.weight) - 1
      : PROFILE.target_weight.max;

  return (
    <>
      <Title>What is your target weight?</Title>
      <InputForm {...PROFILE.target_weight} min={min} max={max} />
    </>
  );
};

export default TargetWeight;
