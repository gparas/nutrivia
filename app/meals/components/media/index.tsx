import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Box from '@mui/material/Box';

const Media = ({ id, name, image }: Tables<'meals'>) => {
  return (
    <Box
      flex="0 0 auto"
      position="relative"
      width="100%"
      pt="75%"
      overflow="hidden"
    >
      <Image
        alt={name}
        src={image}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        style={{
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default Media;
