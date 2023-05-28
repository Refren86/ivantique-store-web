import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { CartProvider, FavouritesProvider } from 'context';

import 'styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
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
  );
}

// wrapper component (hoc) which will check whether user is logged in before rendering component
function Auth({ children }) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Потрібно увійти'); // will redirect to unauthorized page
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default App;
