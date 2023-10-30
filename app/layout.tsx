import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  children: React.ReactNode;
  getStarted: React.ReactNode;
}

const RootLayout = ({ children, getStarted }: Props) => {
  const isLoggedIn = false;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {isLoggedIn ? children : getStarted}
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
