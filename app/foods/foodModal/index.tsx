'use client';

import { useState } from 'react';
import { Tables } from '@/types/supabase';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@/components/dialog';
import SubmitFormButton from '@/components/submit-form-button';
import { priceFormat } from '@/lib/utils';
import { addMeal } from './actions';

const initialState = {
  status: '',
};

interface Props {
  food: Tables<'foods'>;
}

const FoodModal = ({ food }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={handleClickOpen}
        sx={{ fontWeight: 500 }}
      >
        View Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ component: 'form', action: addMeal }}
      >
        <Box
          position="relative"
          overflow="hidden"
          pt="66.6667%"
          width="100%"
          flex="0 0 auto"
        >
          <Image
            fill
            alt={food.name}
            src={food.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            style={{
              objectFit:
                food.image_orientation === 'square' ? 'contain' : 'cover',
            }}
          />
        </Box>
        <Box p={2} flex="1 1 auto">
          <Typography variant="overline" color="text.secondary">
            {food.category}
          </Typography>
          <Typography variant="h5" mb={2} fontWeight={500}>
            {food.name}
          </Typography>
          <Typography variant="body2" mb={3}>
            {food.description}
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
                {food.kcal}kcal
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Carbs"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.carbs}g
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Protein"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.protein}g
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Fat"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.fat}g
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box px={2} py={3} flex="0 0 auto" textAlign="center">
          <input type="hidden" name="meal_id" defaultValue={food.id} />
          <input
            type="hidden"
            name="meal_category"
            defaultValue={food.category}
          />
          <SubmitFormButton>
            Order now {priceFormat(Number(food.price))}
          </SubmitFormButton>
        </Box>
      </Dialog>
    </>
  );
};

export default FoodModal;
