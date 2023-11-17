import Grid from '@mui/material/Grid';
import ListItem from '@/components/ListItem';
import Caloriebalance from './components/Caloriebalance';
import Nutrients from './components/Nutrients';
import { LIST_ITEMS } from './constants';

const DiaryPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} display="flex" flexDirection="column">
        <Caloriebalance />
      </Grid>
      <Grid item xs={12} md={4}>
        <Nutrients />
      </Grid>
      {LIST_ITEMS.map(item => (
        <Grid key={item.id} item xs={12}>
          <ListItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DiaryPage;
