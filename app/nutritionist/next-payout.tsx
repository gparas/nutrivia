import Card from '@/components/card';
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { priceFormat } from '@/lib/utils';
import Button from '@mui/material/Button';

const NextPayout = () => {
  return (
    <Card height={'100%'}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Next payout
      </Typography>
      <Typography variant="h3" mb={0.25}>
        {priceFormat(2000)}
      </Typography>
      <Typography variant="body2" color="success.main" fontWeight={500} mb={2}>
        &uarr;120{' '}
        <Typography
          variant="inherit"
          color="text.secondary"
          component="span"
          fontWeight={400}
        >
          vs previous month
        </Typography>
      </Typography>
      <List sx={{ flex: '1 1 auto' }}>
        <ListItem disableGutters>
          <ListItemText secondary="Payout schedule" />
          <Typography variant="body2" fontWeight={500} component="span">
            Every 30 days
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText secondary="Next payout day" />
          <Typography variant="body2" fontWeight={500} component="span">
            04 Jan 24
          </Typography>
        </ListItem>
      </List>
      <Button variant="outlined" color="inherit" size="large">
        Payout History
      </Button>
    </Card>
  );
};

export default NextPayout;
