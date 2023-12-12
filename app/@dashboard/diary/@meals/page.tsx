import { promises as fs } from 'fs';
import Stack from '@mui/material/Stack';
import ListItem from '@/components/listItem';
import { Meal } from '@/types/meal';
import { LIST_ITEMS } from './constants';

const MealsPage = async () => {
  const file = await fs.readFile(process.cwd() + '/app/meals.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <Stack spacing={2}>
      {data?.map((meal: Meal) => (
        <ListItem
          key={meal.slot_id}
          iconId={meal.slot_name}
          textPrimary={meal.slot_name}
          textSecondary="Recommended 444 - 622 kcal"
          href={`/diary/${meal.slot_name}`}
        />
      ))}
      {LIST_ITEMS.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </Stack>
  );
};

export default MealsPage;
