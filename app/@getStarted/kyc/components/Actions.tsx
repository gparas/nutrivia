'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBackRounded';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';

const Actions = () => {
  const router = useRouter();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mt={{ xs: 'auto', sm: 8 }}
    >
      <Button
        color="inherit"
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ fontWeight: 'regular' }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        size="large"
        type="submit"
        endIcon={<ArrowNext />}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Actions;
