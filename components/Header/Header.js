import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { CartContext, FavouritesContext } from 'context';
import { Button } from 'components/Button';
import { ClientOnly } from 'components/ClientOnly';

export const Header = () => {
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext)

  useEffect(() => {
    setCartCount(cart?.length);
    setFavCount(favourites?.length);
  }, [favourites]);

  return (
    <header className="bg-primary-500">
      <div className="wrapper flex justify-between">
        <div className="flex items-center gap-x-12">
          <Link href="/">
            <a>
              <h2 className="text-white font-bold text-3xl">
                Iv<span>antique</span>
              </h2>
            </a>
          </Link>

          <Link href="tel:+380679362212">
            <a className="hidden sm:flex items-center gap-x-3 text-white hover:opacity-80">
              <Image
                src="/icons/common/phone.svg"
                alt="phone"
                width={24}
                height={24}
              />
              +380679362212
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-x-6">
          <Link href="/favourites">
            <a>
              <Button variant="icon" className="relative">
                {favourites?.length > 0 && (
                  <ClientOnly>
                    <span className="absolute top-0 flex w-4 h-4 justify-center items-center right-0 bg-red-500 text-white rounded-full text-xs z-10">
                      {favCount}
                    </span>
                  </ClientOnly>
                )}

                <Image
                  src="/icons/common/heart.svg"
                  alt="heart"
                  width={26}
                  height={26}
                />
              </Button>
            </a>
          </Link>

          <Link href="/cart">
            <a>
              <Button variant="icon" className="relative">
                <ClientOnly>
                  {cart?.length > 0 && (
                    <ClientOnly>
                      <span className="absolute top-0 flex w-4 h-4 justify-center items-center right-0 bg-red-500 text-white rounded-full text-xs z-10">
                        {cartCount}
                      </span>
                    </ClientOnly>
                  )}
                </ClientOnly>
                <Image
                  src="/icons/common/cart.svg"
                  alt="cart"
                  width={26}
                  height={26}
                />
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
