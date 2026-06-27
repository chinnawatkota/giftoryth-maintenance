'use client';

import { useRef } from 'react';
import { OutlineButton } from '@/components/buttons';
import { ProductCard } from '@/components/cards';
import { customBasketsList, nonCustomBasketsList } from '@/constants/basket';
import { cn } from '@/utils';

const BasketsPageClient = () => {
  const nonCustomBasketsRef = useRef<HTMLDivElement>(null);
  const specialCustomDesignBasketsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[calc(100dvh-290px)]">
      <div className="flex flex-wrap justify-center gap-4 px-2 md:justify-start md:px-8">
        <OutlineButton
          color="primary"
          size="lg"
          onClick={() =>
            nonCustomBasketsRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        >
          Non Custom Baskets
        </OutlineButton>
        <OutlineButton
          color="primary"
          size="lg"
          onClick={() =>
            specialCustomDesignBasketsRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        >
          Special Custom Design
        </OutlineButton>
      </div>

      <div className="flex h-fit w-full flex-col px-4 py-8 pb-[30px] md:px-8 md:py-10 lg:py-12 xl:py-14">
        <h1
          ref={nonCustomBasketsRef}
          id="non-custom"
          className="mb-2 scroll-mt-24 text-lg font-extralight leading-tight tracking-wide md:text-xl xl:text-2xl"
        >
          Non Custom Baskets
        </h1>
        <div className="mt-4 h-[2px] w-12 bg-maroon md:w-16" />
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {nonCustomBasketsList.map(basket => (
          <ProductCard key={basket.image + basket.title} {...basket} />
        ))}
      </div>

      <div className="pb:[30px] flex h-fit w-full flex-col px-4 py-8 md:px-8 md:py-10 lg:py-12 xl:py-14">
        <h1
          ref={specialCustomDesignBasketsRef}
          id="sepcial-custom-design"
          className="mb-2 scroll-mt-24 text-lg font-extralight leading-tight tracking-wide md:text-xl xl:text-2xl"
        >
          Special Custom Design Baskets
        </h1>
        <div className="mt-4 h-[2px] w-12 bg-maroon md:w-16" />
      </div>
      <div
        className={cn(
          'mb-4 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {customBasketsList.map(basket => (
          <ProductCard
            key={basket.image + basket.title}
            {...basket}
            className="relative place-items-baseline bg-maroon"
            imageClassName={basket?.imageClassName || 'abs'}
            defaultBackground
          />
        ))}
      </div>
    </div>
  );
};

export default BasketsPageClient;
