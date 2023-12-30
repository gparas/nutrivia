import Typography, { TypographyProps } from '@mui/material/Typography';

type Props = {
  name: string;
} & TypographyProps;

const Name = ({ name }: Props) => {
  return (
    <Typography fontWeight={500} gutterBottom>
      {name}
    </Typography>
  );
};

export default Name;
