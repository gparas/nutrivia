import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';

const GetStartedPage = () => {
  return (
    <Stack
      spacing={3}
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h1" variant="h4" fontWeight={700} align="center">
        Healthy Eating Made Easy.
      </Typography>
      <Typography fontWeight="regular" align="center">
        Get your meals tailored to your fitness goals
      </Typography>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowNext />}
        component={NextLink}
        href="/getStarted/kyc"
        sx={{ px: 3, py: 1.5, fontSize: 16 }}
      >
        Get started
      </Button>
    </Stack>
  );
};

export default GetStartedPage;
