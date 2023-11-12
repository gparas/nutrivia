import NextLink from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';

const Onboarding = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight={700}
        mb={3}
        align="center"
      >
        Healthy Eating Made Easy.
      </Typography>
      <Typography fontWeight="regular" mb={3} align="center">
        Answer the questions to get your daily personalized recommendations.
      </Typography>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowNext />}
        component={NextLink}
        href="/kyc"
        sx={{ px: 3, py: 1.5, fontSize: 16 }}
      >
        Get started
      </Button>
    </Container>
  );
};

export default Onboarding;
