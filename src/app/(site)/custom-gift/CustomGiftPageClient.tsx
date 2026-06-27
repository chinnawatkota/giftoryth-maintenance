'use client';

import { ProductCard } from '@/components/cards';
import { customGift } from '@/constants/custom-gift';
import { cn } from '@/utils';

const CustomGiftPageClient = () => {
  return (
    <div className="mb-4 min-h-[calc(100dvh-290px)]">
      <div className="flex h-fit w-full flex-col px-4 pb-[30px] pt-8 md:px-8 md:py-10 lg:py-12 xl:py-14">
        <h1
          id="custom-gift"
          className="mb-2 scroll-mt-24 text-lg font-extralight leading-tight tracking-wide md:text-xl xl:text-2xl"
        >
          Custom Gift
        </h1>
        <div className="mt-4 h-[2px] w-12 bg-maroon md:w-16" />
      </div>
      <div
        className={cn(
          'flex flex-col gap-6 px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 md:px-8 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {customGift.map(({ className, ...gift }) => (
          <ProductCard
            key={gift.image + gift.title}
            className={cn('max-w-full', className)}
            {...gift}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomGiftPageClient;
