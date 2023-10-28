import NextLink from 'next/link';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

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
      <Button
        component={Link}
        href="/onboarding/kyc"
        variant="contained"
        size="large"
        sx={{ px: 3, py: 1.5, fontSize: 16 }}
        endIcon={<ArrowForwardRoundedIcon />}
      >
        Get started
      </Button>
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
