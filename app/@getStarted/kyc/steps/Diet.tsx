import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Diet = () => {
  return (
    <>
      <Title>What types of diet do you prefer?</Title>
      <OptionsForm
        param="diet"
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
          {
            value: 'fasting',
            primaryText: 'Fasting',
          },
        ]}
      />
    </>
  );
};

export default Diet;
