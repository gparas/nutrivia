import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import SportIcon from '@mui/icons-material/SportsGymnastics';
import AddIcon from '@mui/icons-material/AddRounded';
import CircularProgressWithLabel from './components/CircularProgressWithLabel';

const HomePage = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <Card elevation={0} sx={{ mb: 3 }}>
          <CardHeader title="Calorie balance" />
          <CardContent>
            <Grid container>
              <Grid item xs textAlign="center">
                <CircularProgressWithLabel value={50}>
                  <FireIcon fontSize="large" color="primary" />
                </CircularProgressWithLabel>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="medium"
                  mt={1}
                >
                  Calorie intake
                </Typography>
                <Typography fontWeight="bold" variant="h6" component="div">
                  1384 <Typography variant="caption">/ 1600 kcal</Typography>
                </Typography>
              </Grid>
              <Grid item>
                <Divider orientation="vertical" light />
              </Grid>
              <Grid item xs textAlign="center">
                <CircularProgressWithLabel value={70} color="secondary">
                  <SportIcon fontSize="large" color="secondary" />
                </CircularProgressWithLabel>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="medium"
                  mt={1}
                >
                  Exercise
                </Typography>
                <Typography fontWeight="bold" variant="h6" component="div">
                  317 <Typography variant="caption">/ 500 kcal</Typography>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body2" fontWeight="medium" mb={0.5}>
                  Carbs
                </Typography>
                <LinearProgress variant="determinate" color="info" value={70} />
                <Typography variant="caption" fontWeight="bold">
                  555{' '}
                  <Typography variant="caption" color="text.secondary">
                    / 800 g
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" fontWeight="medium" mb={0.5}>
                  Proteins
                </Typography>
                <LinearProgress
                  variant="determinate"
                  color="error"
                  value={35}
                />
                <Typography variant="caption" fontWeight="bold">
                  193{' '}
                  <Typography variant="caption" color="text.secondary">
                    / 480 g
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" fontWeight="medium" mb={0.5}>
                  Fats
                </Typography>
                <LinearProgress
                  variant="determinate"
                  color="warning"
                  value={85}
                />
                <Typography variant="caption" fontWeight="bold">
                  262{' '}
                  <Typography variant="caption" color="text.secondary">
                    / 320 g
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card elevation={0} sx={{ mb: 3 }}>
          <CardHeader
            title="Weight"
            action={
              <Button
                variant="text"
                size="small"
                endIcon={<AddIcon />}
                sx={{ fontWeight: 'medium' }}
              >
                Log Weight
              </Button>
            }
          />
          <CardContent sx={{ pt: 0 }}>
            <Stack direction="row" spacing={1} mb={1} alignItems="center">
              <Typography fontWeight="bold" variant="h6">
                58,1 kg
              </Typography>
              <Chip
                label="1,9 kg lost"
                sx={{ bgcolor: 'warning.200', height: 20, fontSize: 12 }}
              />
            </Stack>
            <LinearProgress variant="determinate" value={70} />
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="right"
              component="div"
              mt={0.5}
            >
              Goal 56 kg
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
};

export default HomePage;
