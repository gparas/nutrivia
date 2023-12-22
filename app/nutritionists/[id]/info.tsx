'use client';

import { useState } from 'react';
import { priceFormat } from '@/lib/utils';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Card from '@/components/card';
import { CircularProgress } from '@mui/material';
import LocationIcon from '@mui/icons-material/FmdGoodOutlined';
import EmailIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import FeeIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

interface Props {
  location?: string | null;
  email: string;
  phone: string;
  id: string;
}

const NutritionistInfo = ({ location, email, phone, id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({ nutritionist_id: id })
          .eq('id', user.id);
      } finally {
        setIsLoading(false);
        router.push('/');
      }
    }
  };
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
          disabled={isLoading}
          onClick={handleClick}
          endIcon={
            isLoading ? <CircularProgress color="inherit" size={20} /> : null
          }
        >
          Contact
        </Button>
      </Box>
    </Card>
  );
};

export default NutritionistInfo;
