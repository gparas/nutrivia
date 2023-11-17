import Stack, { StackProps } from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const Card = ({ ...other }: StackProps) => {
  return <Stack component={Paper} elevation={0} p={2} {...other} />;
};

export default Card;
