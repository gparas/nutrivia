'use client';

import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageTitle from '@/components/page-title';

const ProgressTitle = () => {
  const router = useRouter();
  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <IconButton aria-label="back" onClick={() => router.back()} edge="start">
        <ArrowBackIcon />
      </IconButton>
      <PageTitle>Progress</PageTitle>
    </Stack>
  );
};

export default ProgressTitle;
