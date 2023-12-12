import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Caloriebalance from './components/Caloriebalance';
import Nutrients from './components/Nutrients';

interface Props {
  meals: ReactNode;
}

const DiaryLayout = async ({ meals }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Stack spacing={2} position="sticky" top={64}>
          <Caloriebalance />
          <Nutrients />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={7} md={8} lg={9}>
        {meals}
      </Grid>
    </Grid>
  );
};

export default DiaryLayout;
