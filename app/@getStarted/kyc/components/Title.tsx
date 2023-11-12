import Typography from '@mui/material/Typography';

const Title = ({ ...other }) => (
  <Typography variant="h5" fontWeight={600} mb={4} align="center" {...other} />
);

export default Title;
