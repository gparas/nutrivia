import { PROFILE } from '@/lib/constants';
import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const FoodPreference = () => {
  return (
    <>
      <Title>What types of diet do you prefer?</Title>
      <OptionsForm required={false} {...PROFILE.food_preference} />
    </>
  );
};

export default FoodPreference;
