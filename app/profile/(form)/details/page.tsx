import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import TextField from '@mui/material/TextField';
import { FIELDS, Fields } from './constants';
import { Profile } from '@/types/profile';
import Typography from '@mui/material/Typography';

const DetailsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();

  return (
    <>
      <Typography variant="h6">Edit personal Details</Typography>
      {Object.values(FIELDS).map((field: Fields) => (
        <TextField
          required
          key={field.name}
          id={field.name}
          fullWidth
          label={field.label}
          select={Boolean(field.options)}
          defaultValue={data![0][field.name as keyof Profile]}
          inputProps={{
            name: field.name,
          }}
          SelectProps={{
            native: true,
          }}
        >
          {field.options
            ? field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : null}
        </TextField>
      ))}
    </>
  );
};

export default DetailsPage;
