'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { CircularProgress, capitalize } from '@mui/material';
import { useFormStatus } from 'react-dom';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ComponentLoader from '@/components/component-loader';
import { addMealPlan } from './actions';

const SubmitButton = ({ ...other }: IconButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <IconButton
      aria-label="add"
      edge="end"
      type="submit"
      disabled={pending}
      {...other}
    >
      {pending ? (
        <CircularProgress color="inherit" thickness={1.5} size={20} />
      ) : (
        <AddIcon fontSize="small" />
      )}
    </IconButton>
  );
};

const Drawer = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState<Tables<'foods'>[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const category = searchParams.get('category');
  const day = searchParams.get('day');
  const active_meal = searchParams.get('active_meal');

  const handleClose = useCallback(() => {
    router.push(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!category) return;
    const fetchMeals = async () => {
      const { data } = await supabase
        .from('foods')
        .select()
        .eq('category', category);
      setMeals(data || []);
      setIsLoading(false);
    };

    fetchMeals();
  }, [category]);

  if (!day && !category) {
    return null;
  }

  return (
    <MuiDrawer
      anchor="right"
      open
      onClose={handleClose}
      ModalProps={{
        onTransitionExited() {
          setMeals([]);
        },
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
      }}
    >
      {isLoading ? (
        <ComponentLoader height={300} />
      ) : (
        <>
          <Stack
            p={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Day {day}</Typography>
            <IconButton aria-label="close" edge="end" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <List
            component="div"
            subheader={
              <ListSubheader component="div">
                {capitalize(category || '')}
              </ListSubheader>
            }
          >
            {meals.map(meal => {
              const selected = active_meal === meal.id;
              return (
                <ListItem key={meal.id} component="form" action={addMealPlan}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent' }}>
                      <Image
                        width={40}
                        height={40}
                        src={meal.image}
                        alt={meal.name}
                        style={{ objectFit: 'cover' }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={meal.name}
                    secondary={`${meal.kcal} kcal`}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                  {selected ? (
                    <CheckIcon color="success" fontSize="small" />
                  ) : (
                    <SubmitButton />
                  )}
                  <input
                    type="hidden"
                    name={'id'}
                    defaultValue={`${user_id}-day-${day}-category-${meal.category}`}
                  />
                  <input
                    type="hidden"
                    name={'day'}
                    defaultValue={Number(day)}
                  />
                  <input
                    type="hidden"
                    name={'category'}
                    defaultValue={meal.category}
                  />
                  <input
                    type="hidden"
                    name={'meal_id'}
                    defaultValue={meal.id}
                  />
                  <input
                    type="hidden"
                    name={'user_id'}
                    defaultValue={user_id}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </MuiDrawer>
  );
};

export default Drawer;
