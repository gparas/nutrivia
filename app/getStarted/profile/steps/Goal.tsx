import { PROFILE } from '@/lib/constants';
import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Goal = () => {
  return (
    <>
      <Title>What is your goal?</Title>
      <OptionsForm {...PROFILE.goal} />
    </>
  );
};

export default Goal;
