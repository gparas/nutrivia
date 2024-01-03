import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import NutritionistProfile from './profile';
import NutritionistInfo from './info';

const NutritionistPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: nutritionists } = await supabase
    .from('nutritionists')
    .select()
    .match({ id });

  if (!nutritionists?.length) {
    notFound();
  }

  const nutritionist = nutritionists[0];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <NutritionistProfile {...nutritionist} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NutritionistInfo {...nutritionist} />
      </Grid>
    </Grid>
  );
};

export default NutritionistPage;
