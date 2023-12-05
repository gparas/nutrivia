import OptionsForm from '../components/OptionsForm';
import Title from '../components/Title';

const Gender = () => {
  return (
    <>
      <Title>What is your gender?</Title>
      <OptionsForm
        param="gender"
        items={[
          {
            value: 'male',
            primaryText: 'Male',
          },
          {
            value: 'female',
            primaryText: 'Female',
          },
        ]}
      />
    </>
  );
};

export default Gender;
