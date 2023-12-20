'use client';

import { redirect, useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import Button from '@mui/material/Button';

interface Props {
  mealId: string;
  mealCategory: string;
}

const OrderButton = ({ mealId, mealCategory }: Props) => {
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
          meal_id: mealId,
          meal_category: mealCategory,
          user_id: user?.id,
        })
        .then(() => router.push('/'));
    }
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Order now
    </Button>
  );
};

export default OrderButton;
