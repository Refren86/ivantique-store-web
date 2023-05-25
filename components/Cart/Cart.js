import { useContext, useEffect, useState } from 'react';

import { CartContext } from 'context';
import { Title } from 'components/Title';
import { Loader } from 'components/Loader';
import { CartItems } from 'components/CartItems';
import { ReturnLink } from 'components/ReturnLink';

export const Cart = () => {
  const { cart } = useContext(CartContext);
  const [furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setFurnitures();
  }, []);

  if (loading) return <Loader />;

  return cart?.length > 0 ? (
    <CartItems furnitures={furnitures} />
  ) : (
    <>
      <Title text="Корзина пуста" />
      <ReturnLink />
    </>
  );
};
