import { StackProps } from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../card';

const CardLoader = ({ ...other }: StackProps) => {
  return (
    <Card alignItems="center" justifyContent="center" {...other}>
      <CircularProgress color="inherit" thickness={1.5} />
    </Card>
  );
};

export default CardLoader;
