import { useForm } from '../components/FormContext';
import Options from '../components/Options';
import Form from '../components/Form';
import Title from '../components/Title';
import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import { createKyc } from './actions';

const Diet = () => {
  const { data: userData } = useSession();
  const { data } = useForm();
  const initialState = { data, userId: userData?.user.id! };
  const [state, formAction] = useFormState(createKyc, initialState);

  return (
    <>
      <Title>What types of diet do you prefer?</Title>
      <Form labelSubmit="Save" action={formAction}>
        <Options
          param="diet"
          col="auto"
          data={data}
          items={[
            {
              value: 'mediterranean',
              label: 'Mediterranean',
            },
            {
              value: 'keto',
              label: 'Keto',
            },
            {
              value: 'vegetarian',
              label: 'Vegetarian',
            },
            {
              value: 'vegan',
              label: 'Vegan',
            },
            {
              value: 'fasting',
              label: 'Fasting',
            },
          ]}
        />
      </Form>
    </>
  );
};

export default Diet;
