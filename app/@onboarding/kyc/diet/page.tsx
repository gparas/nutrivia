import OptionsPills from '../components/OptionsPills';
import Title from '../components/Title';

const Diet = () => (
  <>
    <Title>What types of diet do you prefer?</Title>
    <OptionsPills
      param="diet"
      items={['Mediterranean', 'Keto', 'Vegetarian', 'Vegan', 'Fasting']}
    />
  </>
);

export default Diet;
