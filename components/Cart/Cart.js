import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import { normalizer } from 'helpers';
import { CartContext } from 'context';
import { Title } from 'components/Title';
import { Loader } from 'components/Loader';
import { CartItems } from 'components/CartItems';
import { ReturnLink } from 'components/ReturnLink';
import { GET_FURNITURE_BY_SLUGS } from 'utils/queries';

export const Cart = () => {
  const { cart } = useContext(CartContext);
  const [furnitures, setFurnitures] = useState([]);

  const { data, loading } = useQuery(GET_FURNITURE_BY_SLUGS, {
    variables: { slugs: cart },
  });

  useEffect(() => {
    setFurnitures(normalizer(data?.furnitures));
  }, [data?.furnitures]);

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
