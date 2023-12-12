'use client';

import { useRouter } from 'next/navigation';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';

const Title = ({ ...other }: TypographyProps) => {
  const router = useRouter();
  return (
    <Stack direction="row" mb={4} alignItems="center" spacing={1}>
      <IconButton aria-label="back" onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" {...other} />
    </Stack>
  );
};

export default Title;
