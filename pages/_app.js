import { CartProvider, FavouritesProvider } from 'context';

import 'styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <FavouritesProvider>
        <Component {...pageProps} />
      </FavouritesProvider>
    </CartProvider>
  );
}

export default App;
