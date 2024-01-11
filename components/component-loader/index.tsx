import Stack, { StackProps } from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const ComponentLoader = ({ ...other }: StackProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" {...other}>
      <CircularProgress color="inherit" thickness={1.5} />
    </Stack>
  );
};

export default ComponentLoader;
