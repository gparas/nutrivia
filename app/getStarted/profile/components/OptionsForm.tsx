'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Profile } from '@/types/profile';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import { useFormContext } from './FormContext';
import Form from './Form';

type ExtractStringFields<Type> = {
  [Property in keyof Type as Extract<keyof Type, number>]: Type[Property];
};

type FormData = ExtractStringFields<Profile>;

type Props = {
  name: string;
  required?: boolean;
  options: {
    value: string;
    label: string;
    helperText?: string;
  }[];
};

const OptionsForm = ({ name, options, required = true }: Props) => {
  const { onChangeData, data } = useFormContext();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FormData> = data => onChangeData(data);
  const watchField = watch(name);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack justifyContent="center" spacing={2}>
        {options.map(({ value, label, helperText }, index) => {
          const selected = watchField
            ? watchField === value
            : data[name as keyof Profile] === value;
          return (
            <Box key={index} flex="1 1 auto">
              <input
                type="radio"
                id={label}
                value={value}
                checked={selected}
                style={{
                  position: 'absolute',
                  clip: 'rect(0,0,0,0)',
                  pointerEvents: 'none',
                }}
                {...register(name, { required })}
              />
              <ListItemButton
                selected={selected}
                htmlFor={label}
                component="label"
                sx={[
                  {
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  },
                  selected && {
                    color: 'secondary.main',
                    borderColor: 'secondary.main',
                  },
                ]}
              >
                <ListItemText
                  primary={label}
                  secondary={helperText}
                  primaryTypographyProps={{ sx: { fontWeight: 'medium' } }}
                  sx={{ mr: 0.5 }}
                />
                {selected ? <DoneIcon /> : null}
              </ListItemButton>
            </Box>
          );
        })}
      </Stack>
      {errors[name] ? (
        <Typography
          component="div"
          variant="caption"
          mt={0.5}
          color="error.main"
        >
          Select one of these options
        </Typography>
      ) : null}
    </Form>
  );
};

export default OptionsForm;
