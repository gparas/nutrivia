'use client';

import { useRouter, usePathname } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useLocalStorage from '@/hooks/useLocalStorage';
import Actions from './components/Actions';
import Stepper from './components/Stepper';
import U from './utils';

interface Props {
  children: React.ReactNode;
}

const KycLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const nextItem = U.getNextPathname(pathname);
  const { saveState } = useLocalStorage('guest');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);
    console.log(obj);
    saveState(obj);
    router.push(nextItem);
  };

  return (
    <Container
      component="form"
      maxWidth="xs"
      onSubmit={handleSubmit}
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        my: 3,
      }}
    >
      <Stepper />
      {children}
      <Typography component="div" variant="caption" align="center" mt={3}>
        We use this information to calculate and provide you with daily
        personalized recommendations.
      </Typography>
      <Actions />
    </Container>
  );
};

export default KycLayout;
