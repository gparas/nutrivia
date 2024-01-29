import { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PageTitle from '@/components/page-title';
import PerformanceChart from './components/performance-chart';
import NextPayout from './components/next-payout';
import Earnings from './components/earnings';
import Conversion from './components/conversion';
import AffiliateLink from './components/affiliate-link';
import Clients from './components/clients';
import { TableSkeletonCard } from '@/components/table-skeleton';

const NutritionistPage = async () => {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        mb={2}
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
          <Suspense fallback={<TableSkeletonCard />}>
            <Clients />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default NutritionistPage;
