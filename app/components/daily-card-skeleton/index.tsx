import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';

const DailyCardSkeleton = () => {
  return (
    <Card direction="row" spacing={2} py={1}>
      <Skeleton variant="circular" width={40} height={40} />
      <div>
        <Typography variant="body1">
          <Skeleton width={48} />
        </Typography>
        <Typography variant="body2">
          <Skeleton width={168} />
        </Typography>
      </div>
    </Card>
  );
};

export default DailyCardSkeleton;
