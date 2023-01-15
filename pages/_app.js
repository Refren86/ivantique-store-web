import { ApolloProvider } from '@apollo/client';

import { apolloClient } from 'utils/services';
import { CartProvider, FavouritesProvider } from 'context';

import 'styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartProvider>
        <FavouritesProvider>
          <Component {...pageProps} />
        </FavouritesProvider>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
