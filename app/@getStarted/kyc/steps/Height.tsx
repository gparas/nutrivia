import { useForm } from '../components/FormContext';
import InputSlider from '../components/InputSlider';
import Form from '../components/Form';
import Title from '../components/Title';

const Height = () => {
  const { onFormSubmit, data } = useForm();
  return (
    <>
      <Title>What is your height?</Title>
      <Form onSubmit={onFormSubmit}>
        <InputSlider data={data} param="height" unit="cm" min={80} max={220} />
      </Form>
    </>
  );
};

export default Height;
