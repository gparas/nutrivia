import { KYC } from '@/lib/constants';
import { useFormContext } from '../components/FormContext';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const TargetWeight = () => {
  const { data } = useFormContext();
  const min = data.goal === 'gain_weight' && Number(data.weight) + 1;
  const max = data.goal === 'lose_weight' && Number(data.weight) - 1;
  return (
    <>
      <Title>What is your target weight?</Title>
      <InputForm
        param="target_weight"
        label="Target weight"
        min={min || KYC.weight.min}
        max={max || KYC.weight.max}
        unit="kg"
      />
    </>
  );
};

export default TargetWeight;
