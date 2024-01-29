import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import NutritionistAlert from '@/components/nutritionist-alert';
import Chat from './components/chat';
import KcalOverview from './components/kcal-overview';
import KcalOverviewSkeleton from './components/kcal-overview-skeleton';
import DailyMeals from './components/daily-meals';
import DailyCardSkeleton from './components/daily-card-skeleton';
import DailyWaterIntake from './components/daily-water-intake';
import DailyWeightTrack from './components/daily-weight-track';

const HomePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    return notFound();
  }

  if (!profile.kcal_intake) {
    redirect('/getStarted');
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Suspense fallback={<KcalOverviewSkeleton />}>
            <KcalOverview profile={profile} />
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <NutritionistAlert nutritionist_id={profile.nutritionist_id} />
            <Suspense
              fallback={[
                [...Array(3).keys()].map(key => (
                  <DailyCardSkeleton key={key} />
                )),
              ]}
            >
              <DailyMeals profile={profile} />
            </Suspense>
            <Suspense fallback={<DailyCardSkeleton />}>
              <DailyWaterIntake />
            </Suspense>
            <Suspense fallback={<DailyCardSkeleton />}>
              <DailyWeightTrack />
            </Suspense>
          </Stack>
        </Grid>
      </Grid>
      <Suspense fallback={<div />}>
        <Chat nutritionist_id={profile.nutritionist_id} />
      </Suspense>
    </>
  );
};

export default HomePage;
