'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { KYC } from '@/lib/constants';
import { Kyc as KycTypes } from '@/types/kyc';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import { useFormContext } from './FormContext';
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

const OptionsForm = ({ param, items }: Props) => {
  const { onChangeData, data } = useFormContext();
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
          const selected = watchField
            ? watchField === value
            : data[param] === value;
          return (
            <Grid item xs={12} key={index}>
              <input
                type="radio"
                id={primaryText}
                value={value}
                checked={selected}
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
                    borderColor: 'grey.300',
                    bgcolor: 'background.paper',
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

export default OptionsForm;
