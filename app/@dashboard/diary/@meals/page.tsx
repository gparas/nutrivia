import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Stack from '@mui/material/Stack';
import ListItem from '@/components/listItem';
import { LIST_ITEMS } from './constants';

const MealsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('mealCategories').select();
  return (
    <Stack spacing={2}>
      {data?.map(({ id, name }) => (
        <ListItem
          key={id}
          iconId={name}
          textPrimary={name}
          textSecondary="Recommended 444 - 622 kcal"
          href={`/diary/${id}`}
        />
      ))}
      {LIST_ITEMS.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </Stack>
  );
};

export default MealsPage;
