import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Card from '@/components/card';
import DietIcon from '@/icons/Diet';
import LogWeightForm from './form';
import dayjs from 'dayjs';

const DailyWeightTrack = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg');

  const lastLoggedWeight = weights
    ? weights[weights.length - 1].kg
    : Number(profile?.weight);
  const loggedWeight = weights?.some(
    weight => weight.created_at === dayjs().format('YYYY-MM-DD'),
  );
  return (
    <>
      <Card p={0}>
        <ListItemButton component={Link} href="?log_weight=true">
          <ListItemIcon>
            <DietIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText primary="Weight" secondary="Log weight" />
          {loggedWeight ? (
            <CheckCircleRounded color="success" />
          ) : (
            <AddIcon color="disabled" />
          )}
        </ListItemButton>
      </Card>
      <Suspense fallback={<div />}>
        <LogWeightForm initValue={lastLoggedWeight} />
      </Suspense>
    </>
  );
};

export default DailyWeightTrack;
