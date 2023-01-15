import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { FavouritesContext, CartContext } from 'context';
import { Button } from 'components/Button';

export const FurnitureCard = ({ furniture }) => {
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  const { name, slug, oldPrice, newPrice, images } = furniture;

  const isFavourite = favourites?.includes(slug);

  return (
    <div className="relative rounded-md shadow-md overflow-hidden">
      <div className="relative h-[400px] w-full">
        <Link href={`/furniture/${slug}`}>
          <a>
            <Image
              className="w-full h-full"
              src={images[0].url}
              alt={name}
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
        <Link href={`/furniture/${slug}`}>
          <a>
            <h2 className="text-xl font-semibold tracking-wider text-center">
              {name}
            </h2>
          </a>
        </Link>

        <p
          data-content={`€${oldPrice}`}
          className="relative text-lg my-3 after:absolute after:inline-block after:content-[attr(data-content)] after:top-0 after:-right-9 after:w-8 after:h-5 after:text-grey-600 after:text-sm after:line-through"
        >
          €{newPrice}
        </p>

        <Button variant="primary-btn" onClick={() => addToCart(slug)}>
          В корзину
        </Button>
      </div>

      <Button
        onClick={() => toggleFavourite(slug)}
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
    </div>
  );
};
