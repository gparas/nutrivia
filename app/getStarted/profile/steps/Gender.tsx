import { PROFILE } from '@/lib/constants';
import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Gender = () => {
  return (
    <>
      <Title>What is your gender?</Title>
      <OptionsForm {...PROFILE.gender} />
    </>
  );
};

export default Gender;
