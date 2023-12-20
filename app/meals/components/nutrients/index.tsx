import { Tables } from '@/types/supabase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Nutrients = ({ kcal, protein, fat, carbs }: Tables<'meals'>) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" textAlign="center">
        {kcal}
        <br />
        <Typography variant="caption">Kcal</Typography>
      </Typography>
      <Typography variant="body2" textAlign="center">
        {protein}
        <br />
        <Typography variant="caption">protein</Typography>
      </Typography>
      <Typography variant="body2" textAlign="center">
        {fat}
        <br />
        <Typography variant="caption">fat</Typography>
      </Typography>
      <Typography variant="body2" textAlign="center">
        {carbs}
        <br />
        <Typography variant="caption">carbs</Typography>
      </Typography>
    </Stack>
  );
};

export default Nutrients;
