import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PageTitle from '@/components/page-title';
import SalesChart from './sales-chart';
import Grid from '@mui/material/Grid';
import TotalSales from './total-sales';
import OrdersTable from './orders-table';
import MealsTable from './meals-table';
import Card from '@/components/card';
import Button from '@mui/material/Button';

const VendorPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase.from('foods').select().range(0, 4);
  return (
    <>
      <PageTitle mb={4}>Vendor</PageTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SalesChart />
        </Grid>
        <Grid item xs={12} md={4} order={[-1, -1, 0]}>
          <TotalSales />
        </Grid>
        <Grid item xs={12}>
          <OrdersTable />
        </Grid>
        <Grid item xs={12}>
          <Card p={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              p={1}
            >
              <Typography variant="h6">Top Meals</Typography>
              <Button
                variant="text"
                color="inherit"
                component={NextLink}
                href="vendor/meals"
              >
                View all
              </Button>
            </Stack>

            <MealsTable meals={foods || []} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorPage;
