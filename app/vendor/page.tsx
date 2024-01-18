import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import EmptyState from '@/components/empty';
import { priceFormat } from '@/lib/utils';

const VendorPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase.from('foods').select().range(0, 5);
  return (
    <>
      <PageTitle mb={4}>Vendor</PageTitle>
      {!foods?.length ? (
        <EmptyState />
      ) : (
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          mb={4}
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
                    alt={food.name!}
                    src={food.image!}
                    priority
                    width={104}
                    height={104}
                    style={{ margin: -8 }}
                  />
                  <Box flex="1 1 auto" py={1}>
                    <Typography fontWeight={500} gutterBottom>
                      {food.name}
                    </Typography>
                    <Typography>{priceFormat(Number(food.price))}</Typography>
                  </Box>
                </Stack>
                <Divider light />
                <Stack direction="row" alignItems="center" p={1}>
                  <Typography variant="body2" flex="1 1 auto" fontWeight={500}>
                    {food.kcal}{' '}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={400}
                    >
                      Kcal
                    </Typography>
                  </Typography>
                  <Button
                    color="secondary"
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
      <Button
        size="large"
        variant="contained"
        component={NextLink}
        href="/vendor/add"
        sx={{ alignSelf: 'center', fontWeight: 500 }}
      >
        Add product
      </Button>
    </>
  );
};

export default VendorPage;
