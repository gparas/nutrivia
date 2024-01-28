import dayjs from 'dayjs';
import PageTitle from '@/components/page-title';

const Progress = () => {
  return (
    <PageTitle mb={3}>
      {dayjs().subtract(7, 'days').format('DD MMM')} -{' '}
      {dayjs().format('DD MMM')}
    </PageTitle>
  );
};

export default Progress;
