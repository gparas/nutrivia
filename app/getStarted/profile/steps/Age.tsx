import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Profile } from '@/types/profile';
import { useFormContext } from '../components/FormContext';
import Form from '../components/Form';
import Title from '../components/Title';

type FormValues = {
  age: Profile['age'];
};

const Age = () => {
  const { onChangeData, data } = useFormContext();
  const initDateValue = data.age ? dayjs().year(data.age) : null;
  const [dateValue, setDateValue] = useState<Dayjs | null>(initDateValue);
  const { setValue, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => onChangeData(data);

  const minDate = dayjs().subtract(70, 'year');
  const maxDate = dayjs().subtract(20, 'year');

  return (
    <>
      <Title>What is your age?</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DatePicker
          label="Year of birth"
          minDate={minDate}
          maxDate={maxDate}
          views={['year']}
          value={dateValue}
          onChange={newValue => {
            setDateValue(newValue);
            setValue('age', newValue?.year());
          }}
          slotProps={{
            textField: {
              required: true,
              color: 'secondary',
              InputLabelProps: {
                required: false,
              },
            },
          }}
        />
      </Form>
    </>
  );
};

export default Age;
