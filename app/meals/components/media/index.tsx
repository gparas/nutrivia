import Image from 'next/image';
import Box from '@mui/material/Box';
import { Tables } from '@/types/supabase';

const Media = ({ name, image }: Tables<'meals'>) => {
  return (
    <Box
      flex="0 0 auto"
      textAlign="center"
      position="relative"
      width="100%"
      height={200}
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
