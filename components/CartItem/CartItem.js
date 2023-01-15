import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { CartContext } from 'context';

export const CartItem = ({ furniture, withRemove, className }) => {
  const { removeFromCart } = useContext(CartContext);

  const { slug, name, images, newPrice } = furniture;

  return (
    <div className="my-3 grid grid-cols-[140px_1fr_38px] sm:grid-cols-[320px_1fr_72px] items-center">
      <div className="relative h-[210px]">
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

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:max-w-[500px] gap-4">
        <p className={`${className} pl-4`}>{name}</p>
        <p className={`${className} pl-4`}>€{newPrice}</p>
      </div>

      {withRemove && (
        <div className="text-center pl-1">
          <span
            className="font-bold cursor-pointer"
            onClick={() => removeFromCart(slug)}
          >
            &#10005;
          </span>
        </div>
      )}
    </div>
  );
};
