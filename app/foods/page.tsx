import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@/components/card';

import Nutrients from './components/nutrients';
import Name from './components/name';
import Price from './components/price';
import EmptyState from '@/components/empty';
import Title from './components/title';
import ActiveFilters from './components/activefilters';

type Props = {
  searchParams?: {
    category?: string;
    kcal?: string;
  };
};

const FoodsPage = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase.from('foods').select('*');

  if (searchParams?.category) {
    query = query.eq('category', searchParams.category);
  }
  if (searchParams?.kcal) {
    query = query.lte('kcal', Number(searchParams.kcal));
  }

  const { data: foods } = await query;

  return (
    <>
      <Title />
      <ActiveFilters />
      {!foods?.length ? (
        <EmptyState />
      ) : (
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          {foods.map(food => {
            return (
              <Card key={food.id} p={0} height="100%">
                <Stack
                  direction="row"
                  spacing={2}
                  px={2}
                  py={1}
                  flex="1 1 auto"
                >
                  <Image
                    alt={food.name}
                    src={food.image}
                    priority
                    width={104}
                    height={104}
                    style={{ margin: -8 }}
                  />
                  <Box flex="1 1 auto" py={1}>
                    <Name name={food.name} />
                    <Price price={food.price} />
                  </Box>
                </Stack>
                <Divider light />
                <Stack direction="row" alignItems="center" p={1}>
                  <Nutrients {...food} />
                  <Button
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 500 }}
                    component={NextLink}
                    href={`/foods/${food.id}`}
                  >
                    View Details
                  </Button>
                </Stack>
              </Card>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default FoodsPage;
