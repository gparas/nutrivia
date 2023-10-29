import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import GetStarted from './GetStarted';

const Onboarding = () => {
  return (
    <Stack alignItems="center" sx={{ mt: 20 }}>
      <Typography
        component="h1"
        variant="h4"
        fontWeight={700}
        mb={3}
        align="center"
      >
        Healthy Eating Made Easy.
      </Typography>
      <Typography variant="h6" fontWeight="regular" mb={3} align="center">
        Nutrition is the key to a healthier weight, better mood, and longevity.
      </Typography>
      <GetStarted />
      <Typography variant="body2" mt={2}>
        Already have an account?{' '}
        <Link component={NextLink} href="#" underline="hover" fontWeight={500}>
          Log in
        </Link>
      </Typography>
    </Stack>
  );
};

export default Onboarding;
