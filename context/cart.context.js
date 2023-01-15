import { createContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { errorToast, successToast } from 'helpers';

const CartContext = createContext({
  cart: null,
  clearCart: () => {},
  addToCart: (slug) => {},
  removeFromCart: (slug) => {},
});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addToCart = (slug) => {
    if (cart?.length === 0) {
      setCart([slug]);
      successToast('Додано до корзини');
    } else if (cart.includes(slug)) {
      errorToast('Товар вже у корзині');
    } else {
      const updatedCart = [...cart, slug];
      setCart(updatedCart);
      successToast('Додано до корзини');
    }
  };

  const removeFromCart = (slug) => {
    setCart((prevState) =>
      prevState.filter((cartItem) => cartItem !== slug)
    );
  };

  const clearCart = () => {
    window.localStorage.clear();
  }

  const value = {
    cart,
    clearCart,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
