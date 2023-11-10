import { KYC } from '@/lib/constants';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const TargetWeight = () => {
  return (
    <>
      <Title>What is your target weight?</Title>
      <InputForm param="target_weight" label="Target weight" {...KYC.weight} />
    </>
  );
};

export default TargetWeight;
