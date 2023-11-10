import { KYC } from '@/lib/constants';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const Weight = () => {
  return (
    <>
      <Title>What is your weight?</Title>
      <InputForm param="weight" label="Weight" {...KYC.weight} />
    </>
  );
};

export default Weight;
