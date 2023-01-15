import { createContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { errorToast, successToast } from 'helpers';

const FavouritesContext = createContext({
  favourites: null,
  toggleFavourite: (slug) => {},
});

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const toggleFavourite = (slug) => {
    if (favourites?.length === 0) {
      setFavourites([slug]);
      successToast('Додано до улюблених');
    } else if (favourites.includes(slug)) {
      const filteredArray = favourites.filter(
        (favourite) => favourite !== slug
      );

      setFavourites(filteredArray);
      errorToast('Видалено з улюблених');
    } else {
      const updatedFavourites = [...favourites, slug];
      setFavourites(updatedFavourites);
      successToast('Додано до улюблених');
    }
  };

  const value = {
    favourites,
    toggleFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesContext, FavouritesProvider };
