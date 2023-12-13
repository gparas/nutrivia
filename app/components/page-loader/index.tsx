import LinearProgress from '@mui/material/LinearProgress';
import Stack, { StackProps } from '@mui/material/Stack';

const PageLoader = ({ ...other }: StackProps) => {
  return (
    <Stack
      flex="1 1 auto"
      alignItems="center"
      justifyContent="center"
      {...other}
    >
      <LinearProgress sx={{ width: 256 }} />
    </Stack>
  );
};

export default PageLoader;
