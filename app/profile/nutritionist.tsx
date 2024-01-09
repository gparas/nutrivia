import { Tables } from '@/types/supabase';
import Image from 'next/image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/card';

interface Props {
  nutritionist: Tables<'nutritionists'> | null;
}

const Nutritionist = ({ nutritionist }: Props) => {
  if (!nutritionist) return null;
  return (
    <Card p={0}>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <Image
                alt={nutritionist.name}
                src={nutritionist.image}
                priority
                width={40}
                height={40}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nutritionist" secondary={nutritionist.name} />
        </ListItem>
      </List>
    </Card>
  );
};

export default Nutritionist;
