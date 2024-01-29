import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';

interface Props {
  meals: Tables<'foods'>[];
}

const ListItemText = ({ ...other }) => (
  <MuiListItemText primaryTypographyProps={{ variant: 'body2' }} {...other} />
);

const CaloriesOverview = ({ meals }: Props) => {
  const totalKcalEaten = meals.reduce((acc, cur) => acc + Number(cur.kcal), 0);
  const avgKcalEaten = totalKcalEaten / meals.length;

  const breakfastEaten = meals
    .filter(meal => meal.category === 'breakfast')
    .reduce((acc, cur) => acc + Number(cur.kcal), 0);
  const lunchEaten = meals
    .filter(meal => meal.category === 'lunch')
    .reduce((acc, cur) => acc + Number(cur.kcal), 0);
  const dinnerEaten = meals
    .filter(meal => meal.category === 'dinner')
    .reduce((acc, cur) => acc + Number(cur.kcal), 0);
  const snackEaten = meals
    .filter(meal => meal.category === 'snack')
    .reduce((acc, cur) => acc + Number(cur.kcal), 0);

  return (
    <>
      <Typography variant="h3" mb={0.25}>
        {Math.floor(avgKcalEaten)}
        <Typography variant="h6" component="span" fontWeight={400} ml={0.5}>
          kcal
        </Typography>
      </Typography>
      <Typography variant="body2" color={'text.secondary'} mb={3}>
        Avg. calories intake
      </Typography>
      <List>
        <ListItem disableGutters>
          <ListItemText primary="Breakfast" />
          <ListItemText
            primary={`${Math.floor((breakfastEaten / totalKcalEaten) * 100)}%`}
            sx={{ flex: '0 0 auto' }}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Lunch" />
          <ListItemText
            primary={`${Math.floor((lunchEaten / totalKcalEaten) * 100)}%`}
            sx={{ flex: '0 0 auto' }}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Dinner" />
          <ListItemText
            primary={`${Math.floor((dinnerEaten / totalKcalEaten) * 100)}%`}
            sx={{ flex: '0 0 auto' }}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Snack" />
          <ListItemText
            primary={`${Math.floor((snackEaten / totalKcalEaten) * 100)}%`}
            sx={{ flex: '0 0 auto' }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default CaloriesOverview;
