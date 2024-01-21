import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Card from '@/components/card';
import { Tables } from '@/types/supabase';
import AgeField from './age-field';
import { FIELDS, Fields } from './constants';
import { updateProfile } from './actions';
import SubmitFormButton from '@/components/submit-form-button';

type Profile = Tables<'profiles'>;

const ProfileForm = ({ profile }: { profile: Profile }) => {
  return (
    <Card p={[3, 4]}>
      <Grid container spacing={3} component="form" action={updateProfile}>
        {Object.values(FIELDS).map((field: Fields) => {
          if (field.name === 'age') {
            return (
              <Grid key={field.name} item xs={12} md={6}>
                <AgeField age={profile.age} />
              </Grid>
            );
          }
          return (
            <Grid key={field.name} item xs={12} md={6}>
              <TextField
                required
                id={field.name}
                fullWidth
                color="secondary"
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
            </Grid>
          );
        })}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <SubmitFormButton fullWidth={false}>Update</SubmitFormButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileForm;
