import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import C from './kyc/constants';

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
        Nutrition is the key to a healthier weight, better mood, and longevity.
      </Typography>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowNext />}
        component={NextLink}
        href={`/kyc/${C.STEPS[0]}`}
        sx={{ px: 3, py: 1.5, fontSize: 16 }}
      >
        Get started
      </Button>
      <Typography variant="body2" mt={2}>
        Already have an account?{' '}
        <Link component={NextLink} href="#" underline="hover" fontWeight={500}>
          Log in
        </Link>
      </Typography>
    </Container>
  );
};

export default Onboarding;
