import { KYC } from '@/lib/constants';
import { Kyc as KycTypes } from '@/types/kyc';
import { ReactNode, createContext, useContext, useState } from 'react';

type ContextType = {
  data: KycTypes;
  activeStep: number;
  onHandleBack: () => void;
  onChangeData: (newData: KycTypes) => void;
};

const FormContext = createContext<ContextType>({
  activeStep: 0,
  data: KYC.initialData,
  onHandleBack: () => {},
  onChangeData: () => {},
});

interface Props {
  children: ReactNode;
}

export function FormProvider({ children }: Props) {
  const [data, setData] = useState<KycTypes>(KYC.initialData);
  const [activeStep, setActiveStep] = useState(0);

  function onHandleBack(): void {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function onChangeData(newData: KycTypes): void {
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
