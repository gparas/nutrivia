'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { capitalize } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';

const Title = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  return (
    <Stack direction="row" alignItems="center" mb={1}>
      <IconButton edge="start" onClick={() => router.back()}>
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <Typography variant="h4" flexGrow={1}>
        {category ? capitalize(category) : 'Meals'}
      </Typography>
    </Stack>
  );
};

export default Title;
