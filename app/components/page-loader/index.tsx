import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

const PageLoader = () => {
  return (
    <Stack flex="1 1 auto" alignItems="center" justifyContent="center">
      <LinearProgress sx={{ width: 256 }} />
    </Stack>
  );
};

export default PageLoader;
