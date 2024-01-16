import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Profile } from '@/types/profile';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useFormContext } from './FormContext';
import Form from './Form';

type ExtractNumberFields<Type> = {
  [Property in keyof Type as Extract<keyof Type, number>]: Type[Property];
};

type FormData = ExtractNumberFields<Profile>;

type Props = {
  name: string;
  label: string;
  min: number;
  max: number;
  unit?: string;
};

const InputForm = ({ name, label, unit, min, max }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onChangeData, data } = useFormContext();
  const onSubmit: SubmitHandler<FormData> = data => onChangeData(data);

  const errorMsg =
    errors[name]?.type === 'min'
      ? `${label} must be greater than or equal to ${min}`
      : errors[name]?.type === 'max'
      ? `${label} must be less than or equal to ${max}`
      : `${label} is required`;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={name}
          defaultValue={data[name as keyof Profile]}
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
                type="tel"
                color="secondary"
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
                helperText={errors[name] && errorMsg}
                InputLabelProps={{ required: false }}
                inputProps={{ autoFocus: true }}
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

export default InputForm;
