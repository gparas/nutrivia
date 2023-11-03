import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { AuthProvider } from '@/auth/provider';
import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/authOptions';
import prisma from '@/prisma/client';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  children: React.ReactNode;
  getStarted: React.ReactNode;
}

const getUserKyc = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email as string },
    include: { kyc: true },
  });

  return user?.kyc;
};

const RootLayout = async ({ children, getStarted }: Props) => {
  const kyc = await getUserKyc();
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <Header />
            {!kyc?.length ? getStarted : children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
