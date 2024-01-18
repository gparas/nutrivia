import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';

const Media = ({ name, image }: Tables<'foods'>) => {
  return (
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
        alt={name}
        src={image}
        priority
        width={104}
        height={104}
        style={{
          objectFit: 'cover',
        }}
      />
    </Avatar>
  );
};

export default Media;
