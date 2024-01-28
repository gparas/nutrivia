import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

interface Props {
  children: ReactNode;
  overview: ReactNode;
  calories: ReactNode;
  water: ReactNode;
  weight: ReactNode;
}

const ProgressLayout = ({
  children,
  overview,
  calories,
  water,
  weight,
}: Props) => {
  return (
    <>
      {children}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {calories}
        </Grid>
        <Grid item xs={12} md={4} order={[-1, -1, 0]}>
          {overview}
        </Grid>
        <Grid item xs={12} md={6}>
          {weight}
        </Grid>
        <Grid item xs={12} md={6}>
          {water}
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressLayout;
