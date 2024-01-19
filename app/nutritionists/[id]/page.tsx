import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import NutritionistProfile from './profile';
import NutritionistInfo from './info';
import BackButton from '@/components/back-button';

const NutritionistPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .match({ id })
    .single();

  if (!nutritionist) {
    return notFound();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BackButton />
      </Grid>
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
