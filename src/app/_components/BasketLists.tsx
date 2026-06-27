import Link from 'next/link';
import Image from 'next/image';
import { shopAllBaskets } from '@/constants/basket';
import { cn } from '@/utils/className';

const BasketLists = () => {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-0 md:px-8 xl:px-0">
      {shopAllBaskets.map(basket => (
        <Link key={basket.image + basket.title} href={basket.url}>
          <div className={cn('group relative aspect-video w-full', basket.className)}>
            <Image
              src={basket.image}
              alt={basket.title}
              fill
              sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 45vw, 90vw"
              className={cn('h-full w-full object-cover', basket.imageClassName)}
              priority={false}
            />
            {basket.description && (
              <>
                <div className="absolute left-0 top-0 size-full bg-shadow-black/30 transition-opacity duration-300" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p className="md:text-md text-center text-sm font-extralight uppercase tracking-wider text-main-white underline-offset-8 sm:text-base lg:text-xl xl:text-nowrap xl:underline">
                    {basket.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BasketLists;
