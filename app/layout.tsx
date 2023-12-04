import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Container from '@mui/material/Container';
import ThemeRegistry from '@/themeRegistry';
import Localization from '@/localization';
import Header from '@/header';

export const metadata: Metadata = {
  title: 'Nutrivia',
  description: 'Healthy eating simplified',
};
interface Props {
  dashboard: ReactNode;
  login: ReactNode;
}

const RootLayout = async ({ dashboard, login }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <Localization>
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
              {session ? dashboard : login}
            </Container>
          </body>
        </ThemeRegistry>
      </Localization>
    </html>
  );
};

export default RootLayout;
