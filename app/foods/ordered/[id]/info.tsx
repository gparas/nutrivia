'use client';

import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import Card from '@/components/card';

const Info = (props: Tables<'foods'>) => {
  const router = useRouter();
  return (
    <Card direction="row" alignItems="center" p={1}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Image
        priority
        width={96}
        height={96}
        src={props.image}
        alt={props.name}
      />
      <ListItemText
        primary={props.name}
        secondary={props.category}
        primaryTypographyProps={{ variant: 'h6' }}
        secondaryTypographyProps={{ variant: 'body1' }}
        sx={{ ml: 1 }}
      />
    </Card>
  );
};

export default Info;
