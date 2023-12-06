import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export default useIsMobile;
