'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';

const BackButton = () => {
  const router = useRouter();
  return (
    <Toolbar disableGutters>
      <Button
        color="inherit"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
      >
        Back
      </Button>
    </Toolbar>
  );
};

export default BackButton;
