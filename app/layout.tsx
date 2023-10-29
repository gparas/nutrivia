import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  children: React.ReactNode;
  onboarding: React.ReactNode;
}

const RootLayout = ({ children, onboarding }: Props) => {
  const isLoggedIn = false;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {isLoggedIn ? children : onboarding}
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
