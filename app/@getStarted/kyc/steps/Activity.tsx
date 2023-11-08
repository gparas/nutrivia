import { useForm } from '../components/FormContext';
import Options from '../components/Options';
import Form from '../components/Form';
import Title from '../components/Title';

const Activity = () => {
  const { onFormSubmit, data } = useForm();

  return (
    <>
      <Title>What is your level of activity?</Title>
      <Form onSubmit={onFormSubmit}>
        <Options
          param="activity_factor"
          data={data}
          items={[
            {
              value: '1.2',
              label: 'Limited exercise',
            },
            {
              value: '1.375',
              label: 'Exercise less than 3 days per week',
            },
            {
              value: '1.55',
              label: 'Exercise most days of the week',
            },
            {
              value: '1.725',
              label: 'Exercise every day',
            },
          ]}
        />
      </Form>
    </>
  );
};

export default Activity;
