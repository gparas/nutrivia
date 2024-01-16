'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';

const BackButton = ({ label }: { label?: string | ReactNode }) => {
  const router = useRouter();
  return (
    <Button
      color="inherit"
      startIcon={<ArrowBackIcon />}
      size="large"
      onClick={() => router.back()}
      sx={{ fontWeight: 400, alignSelf: 'flex-start' }}
    >
      {label || 'back'}
    </Button>
  );
};

export default BackButton;
