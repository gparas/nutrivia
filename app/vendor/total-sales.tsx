import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@/components/card';
import { DATA_CURRENT, DATA_PREVIOUS } from './constants';
import { priceFormat } from '@/lib/utils';

const TotalSales = () => {
  const curSales = DATA_CURRENT.reduce((acc, cur) => acc + cur, 0);
  const prevSales = DATA_PREVIOUS.reduce((acc, cur) => acc + cur, 0);
  return (
    <Card height={'100%'}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Total Sales
      </Typography>
      <Typography variant="h3" mb={0.25}>
        {curSales}
        <Typography variant="h6" component="span" fontWeight={400}>
          €
        </Typography>
      </Typography>
      <Typography variant="body2" color="success.main" fontWeight={500} mb={2}>
        &uarr;{priceFormat(curSales - prevSales)}{' '}
        <Typography
          variant="inherit"
          color="text.secondary"
          component="span"
          fontWeight={400}
        >
          vs previous week
        </Typography>
      </Typography>
      <List sx={{ flex: '1 1 auto' }}>
        <ListItem disableGutters>
          <ListItemText secondary="Total orders" />
          <Typography variant="body2" fontWeight={500} component="span">
            {DATA_CURRENT.length}
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText secondary="Total customers" />
          <Typography variant="body2" fontWeight={500} component="span">
            32
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default TotalSales;
