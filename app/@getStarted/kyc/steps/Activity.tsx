import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Activity = () => {
  return (
    <>
      <Title>What is your level of activity?</Title>
      <OptionsForm
        param="activity_factor"
        items={[
          {
            value: '1.2',
            primaryText: 'Sedentary',
            secondaryText: 'Limited exercise',
          },
          {
            value: '1.375',
            primaryText: 'Lightly active',
            secondaryText: 'Light exercise less than 3 days per week',
          },
          {
            value: '1.55',
            primaryText: 'Moderately active',
            secondaryText: 'Exercise most days of the week',
          },
          {
            value: '1.725',
            primaryText: 'Very active',
            secondaryText: 'Exercise every day',
          },
        ]}
      />
    </>
  );
};

export default Activity;
