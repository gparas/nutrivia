import NextLink from 'next/link';
import Button from '@mui/material/Button';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import C from './kyc/constants';

const GetStarted = () => {
  return (
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
  );
};

export default GetStarted;
