import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SubmitButton from './submitButton';
import { submit } from './actions';

const Exercise = () => {
  return (
    <Stack component="form" flex="1 1 auto" action={submit}>
      <Typography variant="h6" flex="0 0 auto" p={2}>
        Exercise
      </Typography>
      <Stack flex="1 1 auto" p={2} spacing={2}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          type="text"
          inputProps={{
            name: 'title',
          }}
        />
        <TextField
          required
          fullWidth
          id="kcal"
          label="Kcal"
          type="tel"
          inputProps={{
            name: 'kcal',
          }}
        />
      </Stack>
      <Box flex="0 0 auto" p={2}>
        <SubmitButton />
      </Box>
    </Stack>
  );
};

export default Exercise;
