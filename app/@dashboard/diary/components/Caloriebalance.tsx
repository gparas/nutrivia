import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import SportIcon from '@mui/icons-material/SportsGymnastics';
import Card from '@/components/card';
import CircularProgressWithLabel from '@/components/circularProgressWithLabel';

const Caloriebalance = () => {
  return (
    <Card height="100%" alignItems="center" direction="row" px={0}>
      <Box textAlign="center" flex="1 1 auto">
        <CircularProgressWithLabel value={50}>
          <FireIcon fontSize="large" color="primary" />
        </CircularProgressWithLabel>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="medium"
          display="block"
          mt={0.5}
        >
          Calorie intake
        </Typography>
        <Typography fontWeight="bold" variant="h6" component="div">
          1384 <Typography variant="caption">/ 1600 kcal</Typography>
        </Typography>
      </Box>
      <Divider orientation="vertical" light />
      <Box textAlign="center" flex="1 1 auto">
        <CircularProgressWithLabel value={70} color="secondary">
          <SportIcon fontSize="large" color="secondary" />
        </CircularProgressWithLabel>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="medium"
          display="block"
          mt={0.5}
        >
          Exercise
        </Typography>
        <Typography fontWeight="bold" variant="h6" component="div">
          317 <Typography variant="caption">/ 500 kcal</Typography>
        </Typography>
      </Box>
    </Card>
  );
};

export default Caloriebalance;
