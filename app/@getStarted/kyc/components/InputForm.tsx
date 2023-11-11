import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { KycTypes } from '@/lib/types';
import { KYC } from '@/lib/constants';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useFormState } from './FormContext';
import Form from './Form';

type ExtractNumberFields<Type> = {
  [Property in keyof Type as Extract<keyof Type, number>]: Type[Property];
};

type FormData = ExtractNumberFields<KycTypes>;

type Props = {
  param: keyof typeof KYC.initialData;
  label: string;
  min: number;
  max: number;
  unit?: string;
};

const Height = ({ param, label, unit, min, max }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onChangeData, data } = useFormState();
  const onSubmit: SubmitHandler<FormData> = data => onChangeData(data);

  const errorMsg =
    errors[param]?.type === 'min'
      ? `${label} must be greater than or equal to ${min}`
      : errors[param]?.type === 'max'
      ? `${label} must be less than or equal to ${max}`
      : `${label} is required`;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={param}
          defaultValue={data[param]}
          rules={{
            required: true,
            min,
            max,
          }}
          render={({ field, fieldState: { invalid } }) => {
            const { onChange, onBlur, value, ref } = field;
            return (
              <TextField
                autoFocus
                type="number"
                label={label}
                ref={ref}
                value={value}
                onChange={event =>
                  onChange(
                    Number.isNaN(parseFloat(event.target.value))
                      ? ''
                      : parseFloat(event.target.value),
                  )
                }
                onBlur={onBlur}
                error={invalid}
                variant="filled"
                helperText={errors[param] && errorMsg}
                InputLabelProps={{ required: false }}
                FormHelperTextProps={{
                  sx: { mx: 0, mt: 0.5 },
                }}
                InputProps={{
                  endAdornment: unit ? (
                    <InputAdornment position="end">{unit}</InputAdornment>
                  ) : null,
                }}
              />
            );
          }}
        />
      </Form>
    </>
  );
};

export default Height;
