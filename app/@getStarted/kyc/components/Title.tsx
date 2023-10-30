import Typography from '@mui/material/Typography';

const Title = ({ ...other }) => (
  <Typography variant="h5" fontWeight={600} mb={7} align="center" {...other} />
);

export default Title;
