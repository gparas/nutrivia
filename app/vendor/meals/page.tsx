import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Stack from '@mui/material/Stack';
import BackButton from '@/components/back-button';
import PageTitle from '@/components/page-title';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Card from '@/components/card';
import MealsTable from '@/components/meals-table';

const ProductsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase
    .from('foods')
    .select()
    .range(0, 19)
    .order('created_at', { ascending: false });

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <BackButton label={<PageTitle>Meals</PageTitle>} />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="meals/add"
        >
          Add meal
        </Button>
      </Stack>
      <Card p={1}>
        <MealsTable rows={foods || []} />
      </Card>
    </>
  );
};

export default ProductsPage;
