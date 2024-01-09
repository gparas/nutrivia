import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import { Profile } from '@/types/profile';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BackButton from '@/components/back-button';
import Card from '@/components/card';
import SubmitFormButton from '@/components/submit-form-button';
import { updateProfile } from './actions';
import Age from './age';
import { FIELDS, Fields } from './constants';

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
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Box component="form" action={updateProfile} mt={2}>
        <Card spacing={3} p={3}>
          <Typography variant="h6">Edit personal Details</Typography>
          {Object.values(FIELDS).map((field: Fields) => {
            if (field.name === 'age') {
              return <Age age={profile.age} />;
            }
            return (
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
            );
          })}
          <SubmitFormButton>Update</SubmitFormButton>
        </Card>
      </Box>
    </Container>
  );
};

export default DetailsPage;
