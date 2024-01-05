'use client';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import PageTitle from '@/components/page-title';

const Title = ({ name }: { name: string | undefined }) => {
  const router = useRouter();
  return (
    <Stack direction="row" alignItems="center" mb={3}>
      <IconButton edge="start" onClick={() => router.back()}>
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <PageTitle flexGrow={1}>{name}</PageTitle>
      <Typography variant="body2">
        {dayjs().subtract(7, 'days').format('DD MMM')} -{' '}
        {dayjs().format('DD MMM')}
      </Typography>
    </Stack>
  );
};

export default Title;
