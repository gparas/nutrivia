import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PageTitle from '@/components/page-title';
import SalesChart from './sales-chart';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@/components/card';
import TotalSales from './total-sales';
import OrdersTable from './orders-table';
import FoodsTable from '@/components/foods-table';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/table-skeleton';

const VendorPage = () => {
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
              <Typography variant="h6">Meals</Typography>
              <Button
                variant="text"
                color="inherit"
                component={NextLink}
                href="vendor/meals/add"
              >
                Add meal
              </Button>
            </Stack>
            <Suspense fallback={<TableSkeleton />}>
              <FoodsTable />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorPage;
