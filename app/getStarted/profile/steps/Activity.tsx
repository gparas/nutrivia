import { PROFILE } from '@/lib/constants';
import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Activity = () => {
  return (
    <>
      <Title>How active are you?</Title>
      <OptionsForm {...PROFILE.activity} />
    </>
  );
};

export default Activity;
