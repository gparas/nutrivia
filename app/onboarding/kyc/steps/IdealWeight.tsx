import InputSlider from '../components/InputSlider';

const IdealWeight = () => {
  return (
    <>
      <InputSlider
        param="ideal_weight"
        unit="kg"
        value={76}
        min={40}
        max={200}
      />
    </>
  );
};

export default IdealWeight;
