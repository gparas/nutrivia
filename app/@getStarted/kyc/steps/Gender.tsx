import Options from '../components/Options';
import Title from '../components/Title';

const Gender = () => (
  <>
    <Title>What is your gender?</Title>
    <Options param="gender" items={['Male', 'Female']} />
  </>
);

export default Gender;
