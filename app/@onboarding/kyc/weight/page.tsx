import InputSlider from '../components/InputSlider';
import Title from '../components/Title';

const Height = () => {
  return (
    <>
      <Title>What is your weight?</Title>
      <InputSlider param="weight" unit="kg" value={80} min={40} max={200} />
    </>
  );
};

export default Height;
