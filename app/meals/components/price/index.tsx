import Typography, { TypographyProps } from '@mui/material/Typography';
import { priceFormat } from '@/lib/utils';

type Props = {
  price: number;
} & TypographyProps;

const Price = ({ price, ...other }: Props) => {
  return <Typography {...other}>{priceFormat(price)}</Typography>;
};

export default Price;
