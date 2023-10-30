import Options from '../components/Options';
import Title from '../components/Title';

const Goal = () => {
  return (
    <>
      <Title>What is your goal?</Title>
      <Options
        param="goal"
        items={['Lose weight', 'Maintain weight', 'Gain weight']}
      />
    </>
  );
};

export default Goal;
