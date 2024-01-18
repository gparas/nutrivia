import { FormEvent } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MACROS_FIELDS } from './constants';
import { InitData, Props } from './types';
import { insertFood } from './actions';
import SubmitFormButton from '@/components/submit-form-button';

const Macros = ({ onClickBack, initData }: Props) => {
  const insertFoodWithData = insertFood.bind(null, initData);
  return (
    <Stack my={1} spacing={2} component="form" action={insertFoodWithData}>
      {MACROS_FIELDS.map(field => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          fullWidth
          required
          defaultValue={initData[field.id as keyof InitData]}
          inputProps={{
            name: field.id,
          }}
        />
      ))}
      <Stack direction="row" alignItems="flex-start" spacing={1}>
        <SubmitFormButton>Save</SubmitFormButton>
        <Button onClick={onClickBack} color="inherit" sx={{ fontWeight: 500 }}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

export default Macros;
