import Typography from '@mui/material/Typography';
import Card from '@/components/card';

interface Props {
  foodKcal: number;
  recommendedKcal: number;
}

const Overview = ({ recommendedKcal, foodKcal }: Props) => {
  const kcalDiff = foodKcal - recommendedKcal;
  return (
    <Card height={'100%'}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Calories intake
      </Typography>
      <Typography variant="h3" mb={0.25}>
        {foodKcal}
        <Typography variant="h6" component="span" fontWeight={400}>
          kcal
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        color={kcalDiff <= 0 ? 'success.main' : 'error.main'}
        fontWeight={500}
      >
        {kcalDiff <= 0 ? <span>&darr;</span> : <span>&uarr;</span>}
        {Math.abs(kcalDiff)}{' '}
        <Typography
          variant="inherit"
          color={'text.secondary'}
          component="span"
          fontWeight={400}
        >
          kcal {kcalDiff <= 0 ? 'under' : 'above'}
        </Typography>
      </Typography>
    </Card>
  );
};

export default Overview;
