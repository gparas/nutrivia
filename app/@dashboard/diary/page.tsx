import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Grid from '@mui/material/Grid';
import ListItem from '@/components/listItem';
import Caloriebalance from './components/Caloriebalance';
import Nutrients from './components/Nutrients';
import { LIST_ITEMS } from './constants';

const DiaryPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('mealCategories').select();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} display="flex" flexDirection="column">
        <Caloriebalance />
      </Grid>
      <Grid item xs={12} md={4}>
        <Nutrients />
      </Grid>
      {data?.map(({ id, name }) => (
        <Grid key={id} item xs={12}>
          <ListItem
            iconId={name.toLowerCase()}
            textPrimary={name}
            textSecondary="Recommended 444 - 622 kcal"
            href={`/meals/${id}`}
          />
        </Grid>
      ))}
      {LIST_ITEMS.map((item, index) => (
        <Grid key={index} item xs={12}>
          <ListItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DiaryPage;
