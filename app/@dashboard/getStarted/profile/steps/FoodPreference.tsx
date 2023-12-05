import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const FoodPreference = () => {
  return (
    <>
      <Title>What types of diet do you prefer?</Title>
      <OptionsForm
        param="food_preference"
        required={false}
        items={[
          {
            value: 'mediterranean',
            primaryText: 'Mediterranean',
          },
          {
            value: 'keto',
            primaryText: 'Keto',
          },
          {
            value: 'vegetarian',
            primaryText: 'Vegetarian',
          },
          {
            value: 'vegan',
            primaryText: 'Vegan',
          },
        ]}
      />
    </>
  );
};

export default FoodPreference;
