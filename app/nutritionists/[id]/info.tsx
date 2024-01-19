'use client';

import { priceFormat } from '@/lib/utils';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Card from '@/components/card';
import LocationIcon from '@mui/icons-material/FmdGoodOutlined';
import EmailIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import FeeIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Link from 'next/link';

interface Props {
  location?: string | null;
  email: string;
  phone: string;
  id: string;
}

const NutritionistInfo = ({ location, email, phone, id }: Props) => {
  return (
    <Card p={0} position="sticky" top={64}>
      <Typography variant="h6" p={2}>
        Contact details
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemIcon>
            <LocationIcon />
          </ListItemIcon>
          <ListItemText primary="Location" secondary={location} />
        </ListItem>
        <Divider component="li" variant="inset" light />
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <Divider component="li" variant="inset" light />
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Phone" secondary={phone} />
        </ListItem>
        <Divider component="li" variant="inset" light />
        <ListItem>
          <ListItemIcon>
            <FeeIcon />
          </ListItemIcon>
          <ListItemText primary="Fees" secondary={`Up to ${priceFormat(50)}`} />
        </ListItem>
      </List>
      <Divider light />
      <Box p={2}>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          component={Link}
          href={`appointment/${id}`}
        >
          Book appointment
        </Button>
      </Box>
    </Card>
  );
};

export default NutritionistInfo;
