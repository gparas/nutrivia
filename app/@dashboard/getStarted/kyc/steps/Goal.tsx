import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Goal = () => {
  return (
    <>
      <Title>What is your goal?</Title>
      <OptionsForm
        param="goal"
        items={[
          {
            value: 'lose_weight',
            primaryText: 'Lose weight',
          },
          {
            value: 'maintain_weight',
            primaryText: 'Maintain weight',
          },
          {
            value: 'gain_weight',
            primaryText: 'Gain weight',
          },
        ]}
      />
    </>
  );
};

export default Goal;
