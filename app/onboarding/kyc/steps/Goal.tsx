import Options from '../components/Options';

const Goal = () => {
  return (
    <Options
      param="goal"
      items={['Lose weight', 'Maintain weight', 'Gain weight']}
    />
  );
};

export default Goal;
