'use client';

import useIsMobile from '@/hooks/useIsMobile';
import Typography, { TypographyProps } from '@mui/material/Typography';

type Props = {
  name: string;
} & TypographyProps;

const Name = ({ name, ...other }: Props) => {
  const isMobile = useIsMobile('md');
  return (
    <Typography
      noWrap
      gutterBottom
      fontWeight={500}
      variant={isMobile ? 'body1' : 'h6'}
      {...other}
    >
      {name}
    </Typography>
  );
};

export default Name;
