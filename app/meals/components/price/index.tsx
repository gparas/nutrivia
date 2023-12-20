import { priceFormat } from '@/lib/utils';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OrderButton from '../orderButton';
import { Tables } from '@/types/supabase';

const Price = ({ id, category }: Tables<'meals'>) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography fontWeight={500}>
        {priceFormat(Math.random() * (20 - 8) + 8)}
      </Typography>
      <OrderButton mealId={id} mealCategory={category} />
    </Stack>
  );
};

export default Price;
