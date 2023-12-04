import { KYC } from '@/lib/constants';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const Height = () => {
  return (
    <>
      <Title>What is your height?</Title>
      <InputForm param="height" label="Height" {...KYC.height} />
    </>
  );
};

export default Height;
