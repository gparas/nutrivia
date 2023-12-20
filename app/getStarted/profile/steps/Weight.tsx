import { PROFILE } from '@/lib/constants';
import InputForm from '../components/InputForm';
import Title from '../components/Title';

const Weight = () => {
  return (
    <>
      <Title>What is your weight?</Title>
      <InputForm {...PROFILE.weight} />
    </>
  );
};

export default Weight;
