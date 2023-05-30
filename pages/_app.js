import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { SessionProvider, useSession } from 'next-auth/react';
import { CartProvider, FavouritesProvider } from 'context';

import 'styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Loader } from 'components';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <CartProvider>
          <FavouritesProvider>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </FavouritesProvider>
        </CartProvider>
      </SessionProvider>
      <Toaster />
    </>
  );
}

// wrapper component (hoc) which will check whether user is logged in before rendering component
function Auth({ children }) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login'); // will redirect to login page
    },
  });

  if (status === 'loading') {
    return <Loader />
  }

  return children;
}

export default App;
