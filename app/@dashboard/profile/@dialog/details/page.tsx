import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { FIELDS, Fields } from './constants';
import { Profile } from '@/types/profile';

const DetailsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();
  return (
    <>
      <DialogTitle>Personal Details</DialogTitle>
      <DialogContent>
        <Stack pt={1} spacing={4}>
          {Object.values(FIELDS).map((field: Fields) => {
            return (
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
            );
          })}
        </Stack>
      </DialogContent>
    </>
  );
};

export default DetailsPage;
