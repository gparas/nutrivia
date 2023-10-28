import InputSlider from '../components/InputSlider';

const BodyMass = () => {
  return (
    <>
      <InputSlider param="height" unit="cm" value={176} min={80} max={220} />
      <InputSlider param="weight" unit="kg" value={80} min={40} max={200} />
    </>
  );
};

export default BodyMass;
