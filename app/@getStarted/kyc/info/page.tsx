import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DatePicker from '@/components/DatePicker';
import Title from '../components/Title';

const page = () => {
  return (
    <>
      <Title>Let's get to know you better</Title>
      <Stack spacing={2}>
        <TextField id="fname" name="fname" label="First name" required />
        <TextField id="lname" name="lname" label="Last name" required />
        <DatePicker
          label="Date of birth"
          disableFuture
          slotProps={{
            textField: {
              id: 'birthday',
              name: 'birthday',
              required: true,
            },
          }}
        />
      </Stack>
    </>
  );
};

export default page;
