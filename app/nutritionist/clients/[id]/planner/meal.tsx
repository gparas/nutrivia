'use client';

import { Tables } from '@/types/supabase';
import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import MealDialog from '@/components/meal-dialog';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';

const SIZE = 48;

interface Props {
  day: number;
  meal: Tables<'foods'>;
}

const Meal = ({ day, meal }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: { name: string; value: string }[]) => {
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      params.forEach(param => {
        urlSearchParams.delete(param.name);
        urlSearchParams.set(param.name, param.value);
      });

      return urlSearchParams.toString();
    },
    [searchParams],
  );
  return (
    <Box border={1} borderRadius={1} borderColor="action.disabled">
      <Stack direction="row" alignItems="center" spacing={1} p={1.5}>
        <Avatar sx={{ bgcolor: 'transparent', width: SIZE, height: SIZE }}>
          <Image
            width={SIZE}
            height={SIZE}
            src={meal.image}
            alt={meal.name}
            style={{ objectFit: 'cover' }}
          />
        </Avatar>
        <ListItemText
          primary={meal.name}
          secondary={`${meal.kcal} kcal`}
          primaryTypographyProps={{ variant: 'body2', noWrap: true }}
        />
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" spacing={0.5} p={0.5}>
        <Button
          size="small"
          variant="text"
          color="inherit"
          sx={{ fontWeight: 500, color: 'text.secondary' }}
          component={Link}
          href={
            pathname +
            '?' +
            createQueryString([
              { name: 'day', value: day.toString() },
              { name: 'category', value: meal.category.toLowerCase() },
              { name: 'active_meal', value: meal.id },
            ])
          }
        >
          replace
        </Button>
        <MealDialog food={meal} />
      </Stack>
    </Box>
  );
};

export default Meal;
