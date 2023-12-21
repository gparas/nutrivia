'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import Button from '@mui/material/Button';
import { priceFormat } from '@/lib/utils';
import { CircularProgress } from '@mui/material';

interface Props {
  id: string;
  category: string;
  price: number;
}

const OrderButton = ({ id, category, price }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleClick = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        await supabase.from('diary').insert({
          meal_id: id,
          meal_category: category,
          user_id: user?.id,
        });
      } finally {
        setIsLoading(false);
        window.location.href = '/';
      }
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleClick}
      size="large"
      sx={{ maxWidth: 320 }}
      disabled={isLoading}
      endIcon={
        isLoading ? <CircularProgress color="inherit" size={20} /> : null
      }
    >
      Order now {priceFormat(price)}
    </Button>
  );
};

export default OrderButton;
