import {
  FormEventHandler,
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import U from './utils';

export interface Data {
  diet?: string;
  gender?: string;
  activity_factor?: string;
  age?: number;
  height?: number;
  target_weight?: number;
}

interface IFormContext {
  activeStep: number;
  data: Data;
  onFormSubmit: FormEventHandler;
  onHandleBack: () => void;
}

const initialData = {
  diet: '',
  gender: '',
  activity_factor: '',
  age: 40,
  height: 176,
  target_weight: 80,
};

const FormContext = createContext<IFormContext>({
  activeStep: 0,
  onHandleBack: () => {},
  onFormSubmit: () => {},
  data: initialData,
});

interface Props {
  children: ReactNode;
}

export function FormProvider({ children }: Props) {
  const [data, setData] = useState(initialData);
  const [activeStep, setActiveStep] = useState(0);

  function onHandleBack(): void {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formElemnt = event.currentTarget;
    const formData = new FormData(formElemnt);
    setData(prevData => ({ ...prevData, ...U.getFormDataObject(formData) }));
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <FormContext.Provider
      value={{ data, onHandleBack, onFormSubmit, activeStep }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
