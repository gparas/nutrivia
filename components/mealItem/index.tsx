import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import OrderButton from './orderButton';
import { Tables } from '@/types/supabase';

interface Props {
  ordered?: boolean;
  meal: Tables<'meals'> | undefined;
}

const MealItem = ({ meal, ordered }: Props) => {
  if (!meal) return null;
  return (
    <>
      <Box
        position="relative"
        overflow="hidden"
        pt="66.6667%"
        width="100%"
        flex="0 0 auto"
      >
        <Image
          fill
          alt={meal.name}
          src={meal.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box p={2} flex="1 1 auto">
        <Typography variant="overline" color="text.secondary">
          {meal.category}
        </Typography>
        <Typography variant="h5" mb={2} fontWeight={500}>
          {meal.name}
        </Typography>
        <Typography variant="body2" mb={3}>
          {meal.description}
        </Typography>
        <Typography variant="subtitle1" fontWeight={500} mb={1}>
          Nutritional information
        </Typography>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary="Kcal"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2" fontWeight={500} component="span">
              {meal.kcal}kcal
            </Typography>
          </ListItem>
          <Divider component="li" light />
          <ListItem disableGutters>
            <ListItemText
              primary="Carbs"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2" fontWeight={500} component="span">
              {meal.carbs}g
            </Typography>
          </ListItem>
          <Divider component="li" light />
          <ListItem disableGutters>
            <ListItemText
              primary="Protein"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2" fontWeight={500} component="span">
              {meal.protein}g
            </Typography>
          </ListItem>
          <Divider component="li" light />
          <ListItem disableGutters>
            <ListItemText
              primary="Fat"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2" fontWeight={500} component="span">
              {meal.fat}g
            </Typography>
          </ListItem>
        </List>
      </Box>
      {!ordered && (
        <Box p={2} flex="0 0 auto" textAlign="center">
          <OrderButton
            id={meal.id}
            category={meal.category}
            price={meal.price}
          />
        </Box>
      )}
    </>
  );
};

export default MealItem;
