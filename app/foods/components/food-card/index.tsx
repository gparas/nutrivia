import { Tables } from '@/types/supabase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@/components/card';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import MealDialog from '@/components/meal-dialog';
import Typography from '@mui/material/Typography';
import { priceFormat } from '@/lib/utils';

interface Props {
  food: Tables<'foods'>;
}

const FoodCard = ({ food }: Props) => {
  return (
    <Card key={food.id} p={0} height="100%">
      <Stack direction="row" spacing={2} px={2} py={1} flex="1 1 auto">
        <Avatar
          variant="rounded"
          sx={{
            width: 104,
            height: 104,
            position: 'relative',
            bgcolor: 'transparent',
          }}
        >
          <Image
            alt={food.name}
            src={food.image}
            priority
            width={104}
            height={104}
            style={{
              objectFit: 'cover',
            }}
          />
        </Avatar>
        <Box flex="1 1 auto" py={1}>
          <Typography variant="body1" fontWeight={500}>
            {food.name}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {priceFormat(Number(food.price))}
          </Typography>
        </Box>
      </Stack>
      <Divider light />
      <Stack direction="row" alignItems="center" p={1}>
        <Typography variant="body2" flex="1 1 auto" fontWeight={500}>
          {food.kcal}{' '}
          <Typography variant="caption" color="text.secondary" fontWeight={400}>
            Kcal
          </Typography>
        </Typography>
        `<MealDialog food={food} showAddCta />
      </Stack>
    </Card>
  );
};

export default FoodCard;
