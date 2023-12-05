import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { notFound } from 'next/navigation';

let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
  useGrouping: false,
});

const Mealpage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('meals')
    .select(
      `
    id, 
    name, 
    image,
    price,
    description,
    mealCategories ( name )
  `,
    )
    .match({ category_id: id });

  if (!data?.length) {
    notFound();
  }

  return (
    <>
      <Typography variant="h4" mb={3}>
        {data[0].mealCategories!.name}
      </Typography>
      <Grid container spacing={2}>
        {data.map(meal => (
          <Grid key={meal.id} item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <Box position="relative" height={200}>
                <Image
                  fill
                  alt={meal.name}
                  src={meal.image}
                  sizes="(min-width: 808px) 50vw, 100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{meal.name}</Typography>
                <Typography>{euro.format(meal.price)}</Typography>
                <Typography variant="body2">{meal.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Mealpage;
