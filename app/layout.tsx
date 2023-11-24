import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Localization from '@/components/Localization';
import Header from '@/components/Header';
import AuthProvider from '@/auth/provider';
import prisma from '@/prisma/client';
import authOptions from './auth/authOptions';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  children: ReactNode;
  getStarted: ReactNode;
}

const getUserKyc = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const kyc = await prisma.kyc.findFirst({
    where: { userId: session.user.id },
  });
  return kyc;
};

const RootLayout = async ({ children, getStarted }: Props) => {
  const kyc = await getUserKyc();
  return (
    <html lang="en">
      <body>
        <Localization>
          <ThemeRegistry>
            <AuthProvider>
              <Header />
              {kyc ? children : getStarted}
            </AuthProvider>
          </ThemeRegistry>
        </Localization>
      </body>
    </html>
  );
};

export default RootLayout;
