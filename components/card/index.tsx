import Paper from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';

const Card = ({ ...other }: StackProps) => {
  return (
    <Stack
      component={Paper}
      p={2}
      elevation={1}
      position="relative"
      borderRadius={1}
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 2px 0px"
      {...other}
    />
  );
};

export default Card;
