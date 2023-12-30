import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';

const Nutrients = ({ kcal }: Tables<'meals'>) => {
  return (
    <Typography variant="body2" flex="1 1 auto" fontWeight={500}>
      {kcal}{' '}
      <Typography variant="caption" color="text.secondary" fontWeight={400}>
        Kcal
      </Typography>
    </Typography>
  );
};

export default Nutrients;
