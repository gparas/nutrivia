import Stack, { StackProps } from '@mui/material/Stack';

const Card = ({ ...other }: StackProps) => {
  return (
    <Stack
      p={2}
      position="relative"
      borderRadius={1}
      bgcolor="background.paper"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      {...other}
    />
  );
};

export default Card;
