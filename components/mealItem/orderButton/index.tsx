'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import Button from '@mui/material/Button';
import { priceFormat } from '@/lib/utils';

interface Props {
  id: string;
  category: string;
  price: number;
}

const OrderButton = ({ id, category, price }: Props) => {
  const supabase = createClient();
  const router = useRouter();

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('diary')
        .insert({
          meal_id: id,
          meal_category: category,
          user_id: user?.id,
        })
        .then(() => router.push('/'));
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleClick}
      size="large"
      sx={{ maxWidth: 320 }}
    >
      Order now {priceFormat(price)}
    </Button>
  );
};

export default OrderButton;
