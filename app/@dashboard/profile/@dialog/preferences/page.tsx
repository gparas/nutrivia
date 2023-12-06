import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PROFILE } from '@/lib/constants';
import { Profile } from '@/types/profile';

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();
  const { name, options } = PROFILE.food_preference;
  return (
    <>
      <DialogTitle>Food preference</DialogTitle>
      <DialogContent>
        <RadioGroup
          defaultValue={data![0][name as keyof Profile]}
          name={PROFILE.food_preference.name}
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
      </DialogContent>
    </>
  );
};

export default page;
