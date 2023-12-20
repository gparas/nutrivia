'use client';

import { ReactNode } from 'react';
import { FormProvider } from './components/FormContext';

interface Props {
  children: ReactNode;
}

const KyxLayout = ({ children }: Props) => {
  return <FormProvider>{children}</FormProvider>;
};

export default KyxLayout;
