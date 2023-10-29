import Typography from '@mui/material/Typography';
import Buttons from './components/Buttons';
import Stepper from './components/Stepper';

interface Props {
  children: React.ReactNode;
}

const OnboardinLayout = ({ children }: Props) => {
  return (
    <>
      <Stepper />
      {children}
      <Typography component="div" variant="caption" align="center" mt={3}>
        We use this information to calculate and provide you with daily
        personalized recommendations.
      </Typography>
      <Buttons />
    </>
  );
};

export default OnboardinLayout;
