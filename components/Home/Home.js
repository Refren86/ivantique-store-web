import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

import { uid } from 'helpers';

export const Home = ({ slides, categories }) => {
  return (
    <div>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        transitionTime={1000}
        dynamicHeight={true}
        stopOnHover={false}
        showThumbs={false}
        swipeable={false}
        animationHandler="fade"
        className="h-[calc(100vh-72px)]"
      >
        {slides.map((slide) => (
          <div
            key={uid()}
            className="relative min-w-screen w-full h-[calc(100vh-72px)]"
          >
            <Image
              className="brightness-50"
              src={slide.image.url}
              alt="furniture"
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />

            <h2 className="absolute opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white tracking-widest cursor-default animate-fade-in-out">
              {slide.title}
            </h2>
          </div>
        ))}
      </Carousel>

      <section className="wrapper my-6">
        <h2 className="font-bold text-3xl mb-3">Категорії товарів</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Link href={`/${category.slug}`} key={uid()}>
              <a>
                <div className="group relative h-[300px] rounded-md shadow-xl overflow-hidden">
                  <div
                    style={{ backgroundImage: `url(${category.image.url})` }}
                    className="h-full bg-cover bg-center transition-all ease-in-out duration-500 group-hover:scale-110"
                  />

                  <h3 className="absolute p-3 opacity-70 bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-white rounded-md tracking-wider transition-opacity ease-in-out duration-500 group-hover:opacity-100">
                    {category.name}
                  </h3>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
