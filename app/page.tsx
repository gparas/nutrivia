import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/AddRounded';
import ListItem from '@/components/ListItem';

const HomePage = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <ListItem
          id="diet"
          textPrimary="Daily plane"
          href="/diary"
          sx={{ mb: 3 }}
        />
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
