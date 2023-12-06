import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  dialog: ReactNode;
}

const ProfileLayout = ({ children, dialog }: Props) => {
  return (
    <>
      {children}
      {dialog}
    </>
  );
};

export default ProfileLayout;
