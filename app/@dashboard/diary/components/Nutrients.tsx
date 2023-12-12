import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@/components/card';

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    carbs: true;
    proteins: true;
    fats: true;
  }
}

const data = [
  {
    id: 'carbs',
    label: 'Carbs',
    color: 'carbs' as const,
    value: 70,
    text: '555 / 800 g',
  },
  {
    id: 'proteins',
    label: 'Proteins',
    color: 'proteins' as const,
    value: 35,
    text: '193 / 480 g',
  },
  {
    id: 'fats',
    label: 'Fats',
    color: 'fats' as const,
    value: 85,
    text: '262 / 320 g',
  },
];
const Nutrients = () => {
  return (
    <Card direction={{ xs: 'row', sm: 'column' }} spacing={3} p={3}>
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
