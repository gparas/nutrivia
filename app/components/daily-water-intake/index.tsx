import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Card from '@/components/card';
import WaterIcon from '@/icons/Water';

const DailyWaterIntake = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: water } = await supabase
    .from('water')
    .select('liter')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  return (
    <Card p={0}>
      <ListItemButton>
        <ListItemIcon>
          <WaterIcon sx={{ fontSize: 40 }} />
        </ListItemIcon>
        <ListItemText
          primary="Water"
          secondary={water ? `${water.liter}L intake` : 'Daily water intake'}
        />
        {water ? (
          <CheckCircleRounded color="success" />
        ) : (
          <AddIcon color="disabled" />
        )}
      </ListItemButton>
    </Card>
  );
};

export default DailyWaterIntake;
