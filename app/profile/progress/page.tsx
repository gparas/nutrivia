import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import PageTitle from '@/components/page-title';
import CardLoader from '@/components/card-loader';
import CaloriesIntake from '@/components/calories-intake';
import WeightTrack from '@/components/weight-track';
import WaterIntake from '@/components/water-intake';
import Overview from './overview';

const ProgressPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }
  return (
    <>
      <PageTitle mb={3}>
        {dayjs().subtract(7, 'days').format('DD MMM')} -{' '}
        {dayjs().format('DD MMM')}
      </PageTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Suspense fallback={<CardLoader height={440} />}>
            <CaloriesIntake user_id={user.id} />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={4} order={[-1, -1, 0]}>
          <Suspense fallback={<CardLoader height={440} />}>
            <Overview user_id={user.id} />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<CardLoader height={240} />}>
            <WeightTrack user_id={user.id} />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<CardLoader height={240} />}>
            <WaterIntake user_id={user.id} />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressPage;
