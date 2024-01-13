import Container from '@mui/material/Container';
import Card from '@/components/card';
import WaterIntakeForm from './form';
import BackButton from '@/components/back-button';
import Typography from '@mui/material/Typography';

const WaterIntakePage = () => {
  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Card mt={2}>
        <Typography variant="h5" mb={3}>
          Water Intake
        </Typography>
        <WaterIntakeForm />
      </Card>
    </Container>
  );
};

export default WaterIntakePage;
