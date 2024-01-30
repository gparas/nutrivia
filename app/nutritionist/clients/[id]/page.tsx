import { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import MealsTable from '@/components/meals-table';
import CardLoader from '@/components/card-loader';
import UserInfo from './components/user-info';
import Macronutrients from './components/macronutrients';
import MealsBreakdown from './components/meals-breakdown';
import WeightTrack from '@/components/weight-track';
import WaterIntake from '@/components/water-intake';
import { TableSkeletonCard } from '@/components/table-skeleton';
import UserExtraInfo from './components/user-extra-info';

const ClientPage = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <Suspense fallback={<CardLoader height={240} />}>
              <UserInfo user_id={id} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Suspense fallback={<CardLoader height={240} />}>
              <UserExtraInfo />
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Suspense fallback={<CardLoader height={240} />}>
              <Macronutrients user_id={id} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Suspense fallback={<CardLoader height={240} />}>
              <MealsBreakdown user_id={id} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Suspense fallback={<CardLoader height={240} />}>
              <WeightTrack user_id={id} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Suspense fallback={<CardLoader height={240} />}>
              <WaterIntake user_id={id} />
            </Suspense>
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<TableSkeletonCard />}>
              <MealsTable user_id={id} />
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientPage;
