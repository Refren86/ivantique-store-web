import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { normalizer } from 'helpers';
import { Title } from 'components/Title';
import { Loader } from 'components/Loader';
import { Furnitures } from 'components/Furnitures';
import { ReturnLink } from 'components/ReturnLink';
import { GET_FURNITURE_BY_SLUGS } from 'utils/queries';

export const Favourites = () => {
  const favourites = useReadLocalStorage('favourites');
  const [furnitures, setFurnitures] = useState([]);

  const { data, loading } = useQuery(GET_FURNITURE_BY_SLUGS, {
    variables: { slugs: favourites },
  });

  useEffect(() => {
    setFurnitures(normalizer(data?.furnitures));
  }, [data?.furnitures]);

  if (loading) return <Loader />;

  return furnitures?.length > 0 ? (
    <Furnitures furnitures={furnitures} />
  ) : (
    <>
      <Title text='На даний момент нічого не додано в "Улюблені"' />
      <ReturnLink />
    </>
  );
};
