import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PROFILE } from '@/lib/constants';
import { Profile } from '@/types/profile';
import Typography from '@mui/material/Typography';

const GoalPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from('profiles').select().eq('id', user?.id!);
  const { name, options } = PROFILE.goal;
  return (
    <>
      <Typography variant="h6">Edit Goal</Typography>
      <RadioGroup
        defaultValue={data![0][name as keyof Profile]}
        name={PROFILE.goal.name}
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default GoalPage;
