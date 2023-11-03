import InputSlider from '../components/InputSlider';
import Title from '../components/Title';

const Height = () => {
  return (
    <>
      <Title>What is your height?</Title>
      <InputSlider param="height" unit="cm" value={176} min={80} max={220} />
    </>
  );
};

export default Height;
