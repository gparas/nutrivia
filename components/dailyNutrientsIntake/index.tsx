import { Tables } from '@/types/supabase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Progress from './progress';
import { getRecommendedMacros } from '@/lib/utils';

interface Props {
  profile: Tables<'profiles'>;
  eatenMacros: {
    carbs: number;
    protein: number;
    fat: number;
  }[];
}

const DailyNutrientsIntake = ({ profile, eatenMacros }: Props) => {
  const { recommendedCarbs, recommendedProtein, recommendedFat } =
    getRecommendedMacros(profile);

  const eatenCarbs = eatenMacros.reduce((acc, cur) => acc + cur.carbs, 0);
  const eatenProtein = eatenMacros.reduce((acc, cur) => acc + cur.protein, 0);
  const eatenFat = eatenMacros.reduce((acc, cur) => acc + cur.fat, 0);

  return (
    <Stack direction="row" justifyContent="space-around">
      <Box width="20%">
        <Typography variant="overline" mb={0.5}>
          Carbs
        </Typography>
        <Progress value={(eatenCarbs / recommendedCarbs) * 100} />
        <Typography variant="caption">
          {recommendedCarbs - eatenCarbs}g{' '}
          <Typography variant="caption">left</Typography>
        </Typography>
      </Box>
      <Box width="20%">
        <Typography variant="overline" mb={0.5}>
          Protein
        </Typography>
        <Progress value={(eatenProtein / recommendedProtein) * 100} />
        <Typography variant="caption">
          {recommendedProtein - eatenProtein}g{' '}
          <Typography variant="caption">left</Typography>
        </Typography>
      </Box>
      <Box width="20%">
        <Typography variant="overline" mb={0.5}>
          Fat
        </Typography>
        <Progress value={(eatenFat / recommendedFat) * 100} />
        <Typography variant="caption">
          {recommendedFat - eatenFat}g{' '}
          <Typography variant="caption">left</Typography>
        </Typography>
      </Box>
    </Stack>
  );
};

export default DailyNutrientsIntake;
