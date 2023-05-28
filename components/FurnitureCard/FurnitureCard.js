import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { Button } from 'components/Button';
import { FavouritesContext, CartContext } from 'context';

export const FurnitureCard = ({ furniture, isAdmin = false }) => {
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  const { _id, title, oldPrice, newPrice, images } = furniture;

  const isFavourite = favourites?.includes(_id);

  return (
    <div className="relative rounded-md shadow-md overflow-hidden">
      <div className="relative h-[400px] w-full">
        <Link href={`/furniture/${_id}`}>
          <a>
            <Image
              className="w-full h-full"
              src={images[0]}
              alt={title}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholders/blur.jpg"
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/furniture/${_id}`}>
          <a>
            <h2 className="text-xl font-semibold tracking-wider text-center">
              {title}
            </h2>
          </a>
        </Link>

        <p
          data-content={`€${oldPrice}`}
          className="relative text-lg my-3 after:absolute after:inline-block after:content-[attr(data-content)] after:top-0 after:-right-9 after:w-8 after:h-5 after:text-grey-600 after:text-sm after:line-through"
        >
          €{newPrice}
        </p>

        {isAdmin ? (
          <Button variant="error-btn" onClick={() => {}}>
            Видалити
          </Button>
        ) : (
          <Button variant="primary-btn" onClick={() => addToCart(_id)}>
            В корзину
          </Button>
        )}
      </div>

      {!isAdmin && (
        <Button
          onClick={() => toggleFavourite(_id)}
          variant="icon"
          className="absolute top-2 right-2"
        >
          <Image
            src={
              isFavourite
                ? '/icons/common/heart-filled.svg'
                : '/icons/common/heart.svg'
            }
            alt="heart"
            width={28}
            height={28}
          />
        </Button>
      )}
    </div>
  );
};
