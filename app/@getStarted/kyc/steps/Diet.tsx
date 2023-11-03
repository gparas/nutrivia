import Options from '../components/Options';
import Title from '../components/Title';

const Diet = () => (
  <>
    <Title>What types of diet do you prefer?</Title>
    <Options
      param="diet"
      col="auto"
      items={['Mediterranean', 'Keto', 'Vegetarian', 'Vegan', 'Fasting']}
    />
  </>
);

export default Diet;
