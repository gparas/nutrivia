import { FormEvent } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INFO_FIELDS } from './constants';
import { InitData, Props } from './types';

const Info = ({ onClickNext, initData }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    onClickNext(Object.fromEntries(data));
  };
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      {INFO_FIELDS.map(field => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          fullWidth
          defaultValue={initData[field.id as keyof InitData]}
          required={field.required}
          select={Boolean(field.options)}
          inputProps={{
            name: field.id,
          }}
          SelectProps={{
            native: true,
          }}
        >
          {field.options
            ? field.options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.textPrimary}
                </option>
              ))
            : null}
        </TextField>
      ))}
      <Stack direction="row" alignItems="flex-start">
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default Info;
