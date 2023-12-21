'use client';

import useIsMobile from '@/hooks/useIsMobile';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { priceFormat } from '@/lib/utils';

type Props = {
  price: number;
} & TypographyProps;

const Price = ({ price, ...other }: Props) => {
  const isMobile = useIsMobile('md');
  return (
    <Typography variant={isMobile ? 'body2' : 'body1'} {...other}>
      {priceFormat(price)}
    </Typography>
  );
};

export default Price;
