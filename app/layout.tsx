import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { doc, getDoc } from 'firebase/firestore';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Localization from '@/components/Localization';
import Header from '@/components/Header';
import AuthProvider from '@/auth/provider';
import authOptions from './auth/authOptions';
import db from '@/firebase/db';

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

  if (!session?.user) return null;

  const docRef = doc(db, 'kyc', session.user.id!);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return docSnap.data();
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
