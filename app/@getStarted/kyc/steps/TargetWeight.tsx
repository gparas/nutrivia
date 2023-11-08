import { useForm } from '../components/FormContext';
import InputSlider from '../components/InputSlider';
import Form from '../components/Form';
import Title from '../components/Title';

const TargetWeight = () => {
  const { onFormSubmit, data } = useForm();
  return (
    <>
      <Title>What is your target weight?</Title>
      <Form onSubmit={onFormSubmit}>
        <InputSlider
          data={data}
          param="target_weight"
          unit="kg"
          min={40}
          max={200}
        />
      </Form>
    </>
  );
};

export default TargetWeight;
