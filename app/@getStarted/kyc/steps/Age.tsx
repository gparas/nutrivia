import { KYC } from '@/lib/constants';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const Age = () => {
  return (
    <>
      <Title>What is your age?</Title>
      <InputForm param="age" label="Age" {...KYC.height} />
    </>
  );
};

export default Age;
