import Options from '../components/Options';
import Title from '../components/Title';

const Activity = () => (
  <>
    <Title>What is your level of activity?</Title>
    <Options
      param="activity"
      items={[
        'I am mostly active and workout regularly',
        'I sit most of the day but workout regularly',
        "I sit most of the day and don't workout",
      ]}
    />
  </>
);

export default Activity;
