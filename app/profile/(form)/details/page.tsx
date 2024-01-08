import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Profile } from '@/types/profile';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Age from './age';
import { FIELDS, Fields } from './constants';
import { notFound } from 'next/navigation';

const DetailsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  if (!profile) {
    return notFound();
  }

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
          defaultValue={profile[field.name as keyof Profile]}
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
      <Age age={profile.age} />
    </>
  );
};

export default DetailsPage;
