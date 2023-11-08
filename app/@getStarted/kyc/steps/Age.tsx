import { useForm } from '../components/FormContext';
import InputSlider from '../components/InputSlider';
import Form from '../components/Form';
import Title from '../components/Title';

const Age = () => {
  const { onFormSubmit, data } = useForm();

  return (
    <>
      <Title>What is your age?</Title>
      <Form onSubmit={onFormSubmit}>
        <InputSlider data={data} param="age" unit="yo" min={20} max={100} />
      </Form>
    </>
  );
};

export default Age;
