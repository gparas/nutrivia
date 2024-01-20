import { Tables } from '@/types/supabase';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

const NutritionistAvatar = ({
  size,
  invisible,
  nutritionist,
}: {
  size: number;
  invisible?: boolean;
  nutritionist: Tables<'nutritionists'>;
}) => {
  return (
    <Badge
      variant="dot"
      color="success"
      overlap="circular"
      invisible={invisible}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar sx={{ width: size, height: size }}>
        <Image
          alt={nutritionist.name}
          src={nutritionist.image}
          width={size}
          height={size}
          style={{ objectFit: 'fill' }}
        />
      </Avatar>
    </Badge>
  );
};

export default NutritionistAvatar;
