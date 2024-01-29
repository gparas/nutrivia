import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Card from '@/components/card';
import DietIcon from '@/icons/Diet';

const DailyWeightTrack = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: weight } = await supabase
    .from('weights')
    .select('kg')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  return (
    <Card p={0}>
      <ListItemButton>
        <ListItemIcon>
          <DietIcon sx={{ fontSize: 40 }} />
        </ListItemIcon>
        <ListItemText primary="Weight" secondary="Log weight" />
        {weight ? (
          <CheckCircleRounded color="success" />
        ) : (
          <AddIcon color="disabled" />
        )}
      </ListItemButton>
    </Card>
  );
};

export default DailyWeightTrack;
