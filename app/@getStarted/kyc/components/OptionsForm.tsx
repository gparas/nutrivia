'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { KYC } from '@/lib/constants';
import { KycTypes } from '@/lib/types';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import { useFormState } from './FormContext';
import Form from './Form';

type ExtractStringFields<Type> = {
  [Property in keyof Type as Extract<keyof Type, number>]: Type[Property];
};

type FormData = ExtractStringFields<KycTypes>;

type Props = {
  param: keyof typeof KYC.initialData;
  items: {
    value: string;
    primaryText: string;
    secondaryText?: string;
  }[];
};

const Options = ({ param, items }: Props) => {
  const { onChangeData, data } = useFormState();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FormData> = data => onChangeData(data);
  const watchField = watch(param);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" spacing={2}>
        {items.map(({ value, primaryText, secondaryText }, index) => {
          const selected = watchField === value;
          return (
            <Grid item xs={12} key={index}>
              <input
                type="radio"
                id={primaryText}
                value={value}
                defaultChecked={data[param] === value}
                style={{
                  position: 'absolute',
                  clip: 'rect(0,0,0,0)',
                  pointerEvents: 'none',
                }}
                {...register(param, { required: true })}
              />
              <ListItemButton
                selected={selected}
                htmlFor={primaryText}
                component="label"
                sx={[
                  {
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'grey.400',
                  },
                  selected && {
                    borderColor: 'primary.main',
                    color: 'primary.dark',
                  },
                ]}
              >
                <ListItemText
                  primary={primaryText}
                  secondary={secondaryText}
                  primaryTypographyProps={{ sx: { fontWeight: 'medium' } }}
                  sx={{ mr: 0.5 }}
                />
                {selected ? <DoneIcon /> : null}
              </ListItemButton>
            </Grid>
          );
        })}
      </Grid>
      {errors[param] ? (
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

export default Options;
