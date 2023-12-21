import Stack, { StackProps } from '@mui/material/Stack';

const Card = ({ ...other }: StackProps) => {
  return (
    <Stack
      p={2}
      position="relative"
      borderRadius={1}
      bgcolor="background.paper"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 2px 0px"
      {...other}
    />
  );
};

export default Card;
