import { useForm } from '../components/FormContext';
import Options from '../components/Options';
import Form from '../components/Form';
import Title from '../components/Title';

const Gender = () => {
  const { onFormSubmit, data } = useForm();

  return (
    <>
      <Title>What is your gender?</Title>
      <Form onSubmit={onFormSubmit}>
        <Options
          param="gender"
          data={data}
          items={[
            {
              value: 'male',
              label: 'Male',
            },
            {
              value: 'female',
              label: 'Female',
            },
          ]}
        />
      </Form>
    </>
  );
};

export default Gender;
