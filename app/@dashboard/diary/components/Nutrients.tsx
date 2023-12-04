import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@/components/card';

const data = [
  {
    id: 'carbs',
    label: 'Carbs',
    color: 'info' as const,
    value: 70,
    text: '555 / 800 g',
  },
  {
    id: 'proteins',
    label: 'Proteins',
    color: 'error' as const,
    value: 35,
    text: '193 / 480 g',
  },
  {
    id: 'fats',
    label: 'Fats',
    color: 'warning' as const,
    value: 85,
    text: '262 / 320 g',
  },
];
const Nutrients = () => {
  return (
    <Card direction={{ xs: 'row', md: 'column' }} spacing={3} p={3}>
      {data.map(item => {
        const text = item.text.split('/');
        return (
          <Box key={item.id} width="100%">
            <Typography variant="body2" fontWeight="medium" mb={0.5}>
              {item.label}
            </Typography>
            <LinearProgress
              variant="determinate"
              color={item.color}
              value={item.value}
            />
            <Typography variant="caption" fontWeight="bold">
              {text[0]}
              <Typography variant="caption" color="text.secondary">
                / {text[1]}
              </Typography>
            </Typography>
          </Box>
        );
      })}
    </Card>
  );
};

export default Nutrients;
