import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { AuthProvider } from '@/auth/provider';
import Header from '@/components/Header';
import { auth } from '@/auth/config';
import prisma from '@/prisma/client';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  children: React.ReactNode;
  login: React.ReactNode;
  getStarted: React.ReactNode;
}

const getUserKyc = async () => {
  const session = await auth();

  console.log(session);

  if (!session) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email as string },
    include: { kyc: true },
  });

  return user?.kyc;
};

const RootLayout = async ({ children, login }: Props) => {
  const session = await auth();
  console.log(session);
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <Header />
            {!session ? login : children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
