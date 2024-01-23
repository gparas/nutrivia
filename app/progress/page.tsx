import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageTitle from '@/components/page-title';

const Progress = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <PageTitle>Progress</PageTitle>
      <Typography variant="body2">
        {dayjs().subtract(7, 'days').format('DD MMM YY')} -{' '}
        {dayjs().format('DD MMM YY')}
      </Typography>
    </Stack>
  );
};

export default Progress;
