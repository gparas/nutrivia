import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Activity = () => {
  return (
    <>
      <Title>How active are you?</Title>
      <OptionsForm
        param="activity"
        items={[
          {
            value: 'low',
            primaryText: 'Low',
            secondaryText: 'Little to no daily activity',
          },
          {
            value: 'moderate',
            primaryText: 'Moderate',
            secondaryText: 'Light daily activity',
          },
          {
            value: 'high',
            primaryText: 'High',
            secondaryText: 'Physical activity throughout the day',
          },
          {
            value: 'intense',
            primaryText: 'Intense',
            secondaryText: 'Physically demanding daily activity',
          },
        ]}
      />
    </>
  );
};

export default Activity;
