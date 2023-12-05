import { PROFILE } from '@/lib/constants';
import { Profile } from '@/types/profile';
import { ReactNode, createContext, useContext, useState } from 'react';

type ContextType = {
  data: Profile;
  activeStep: number;
  onHandleBack: () => void;
  onChangeData: (newData: Profile) => void;
};

const FormContext = createContext<ContextType>({
  activeStep: 0,
  data: PROFILE.initialData,
  onHandleBack: () => {},
  onChangeData: () => {},
});

interface Props {
  children: ReactNode;
}

export function FormProvider({ children }: Props) {
  const [data, setData] = useState<Profile>(PROFILE.initialData);
  const [activeStep, setActiveStep] = useState(0);

  function onHandleBack(): void {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function onChangeData(newData: Profile): void {
    setData(prevData => ({ ...prevData, ...newData }));
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  return (
    <FormContext.Provider
      value={{ data, onHandleBack, onChangeData, activeStep }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
