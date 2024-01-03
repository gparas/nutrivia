import { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import ThemeRegistry from '@/themeRegistry';
import Localization from '@/localization';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <Header />
          <Container
            component="main"
            sx={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              py: 3,
            }}
          >
            <Localization>{children}</Localization>
          </Container>
          <SpeedInsights />
        </body>
      </ThemeRegistry>
    </html>
  );
};

export default RootLayout;
