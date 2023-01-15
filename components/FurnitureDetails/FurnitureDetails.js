import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { CartContext } from 'context';
import { uid } from 'helpers';
import { Button } from 'components/Button';

export const FurnitureDetails = ({ furnitures }) => {
  const router = useRouter();
  const { cart, addToCart } = useContext(CartContext);

  const [furniture] = furnitures;

  const {
    name,
    slug,
    images,
    description,
    oldPrice,
    newPrice,
    materials,
    century,
    depth,
    height,
    width,
    manufactorer,
    style,
  } = furniture;

  const handleBuy = () => {
    if (cart.includes(slug)) {
      router.push('/cart?buy=true');
    } else {
      addToCart(slug)
      router.push('/cart?buy=true');
    }
  }

  return (
    <div className="wrapper mt-4">
      <h2 className="text-3xl font-bold mb-4">{name}</h2>

      <div className="relative flex flex-col lg:flex-row justify-between gap-x-8">
        <Carousel
          showStatus={false}
          showIndicators={true}
          autoPlay={false}
          dynamicHeight={true}
          swipeable={true}
          showThumbs={true}
          showArrows={true}
          transitionTime={500}
          infiniteLoop={true}
          animationHandler="fade"
          className="flex-[3] overflow-x-auto"
          renderThumbs={() =>
            images.map((img) => (
              <Image
                key={img.url}
                src={img.url}
                alt="furniture"
                width={80}
                height={46}
                objectFit="cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholders/blur.jpg"
              />
            ))
          }
          
        >
          {images.map((image) => (
            <div className="relative w-full h-[600px]" key={uid()}>
              <Image
                src={image.url}
                alt="furniture"
                layout="fill"
                objectFit="cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholders/blur.jpg"
              />
            </div>
          ))}
        </Carousel>

        <div className="sticky top-4 h-fit flex-3 mb-7 p-6 flex-[2] rounded-md shadow-lg border border-secondary-400">
          <h3>
            <span className="text-lg font-semibold">Опис:</span> {description}
          </h3>

          <p
            data-content={`€${oldPrice}`}
            className="relative inline-block text-lg font-semibold my-2 after:absolute after:inline-block after:content-[attr(data-content)] after:top-0 after:-right-9 after:w-8 after:h-5 after:text-grey-600 after:text-sm after:line-through"
          >
            Ціна: €{newPrice}
          </p>

          <h3 className="flex items-center gap-x-2">
            <span className="text-lg font-semibold">Доставка:</span>
            <Image
              src="/icons/common/nova-poshta.svg"
              width={90}
              height={30}
              alt="Nova Poshta"
            />
          </h3>

          <div className="mt-6">
            <Button variant="secondary-btn" onClick={handleBuy}>Купити</Button>

            <Button className="ml-4" variant="primary-btn" onClick={() => addToCart(slug)}>
              В корзину
            </Button>
          </div>
        </div>
      </div>

      <div className="my-6">
        <table className="block">
          <thead>
            <tr>
              <td className="font-bold text-2xl" colSpan="2">
                Характеристики
              </td>
            </tr>
          </thead>

          <tbody className="block mt-4">
            <tr className="flex bg-grey-300 p-3">
              <td className="flex-1 font-semibold text-lg">Метеріал</td>
              <td className="flex-1 text-lg">
                {materials.map((material) => material.name).join(', ')}
              </td>
            </tr>
            <tr className="flex p-3">
              <td className="flex-1 font-semibold text-lg">Виробництво</td>
              <td className="flex-1 text-lg">{manufactorer.name}</td>
            </tr>
            <tr className="flex bg-grey-300 p-3">
              <td className="flex-1 font-semibold text-lg">Стиль</td>
              <td className="flex-1 text-lg">{style.name}</td>
            </tr>
            <tr className="flex p-3">
              <td className="flex-1 font-semibold text-lg">
                Період виробництва
              </td>
              <td className="flex-1 text-lg">{century.value} ст</td>
            </tr>
            <tr className="flex bg-grey-300 p-3">
              <td className="flex-1 font-semibold text-lg">Глибина (см)</td>
              <td className="flex-1 text-lg">{depth}</td>
            </tr>
            <tr className="flex p-3">
              <td className="flex-1 font-semibold text-lg">Ширина (см)</td>
              <td className="flex-1 text-lg">{width}</td>
            </tr>
            <tr className="flex bg-grey-300 p-3">
              <td className="flex-1 font-semibold text-lg">Висота (см)</td>
              <td className="flex-1 text-lg">{height}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
