import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import PageTitle from '@/components/page-title';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PerformanceChart from './performance-chart';
import NextPayout from './next-payout';
import Earnings from './earnings';
import Conversion from './conversion';
import AffiliateLink from './affiliate-link';
import ClientsTable from './clients-table';

const NutritionistPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase.from('profiles').select();

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        mb={4}
      >
        <PageTitle flex="1 1 auto">Dashboard</PageTitle>
        <AffiliateLink />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PerformanceChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <NextPayout />
        </Grid>
        <Grid item xs={12} md={6}>
          <Earnings />
        </Grid>
        <Grid item xs={12} md={6}>
          <Conversion />
        </Grid>
        <Grid item xs={12}>
          <ClientsTable profiles={profiles || []} />
        </Grid>
      </Grid>
    </>
  );
};

export default NutritionistPage;
