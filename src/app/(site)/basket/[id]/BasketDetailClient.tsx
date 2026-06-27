'use client';

import Image from 'next/image';
import { OutlineButton } from '@/components/buttons';
import { cn } from '@/utils/className';
import { formatPrice } from '@/utils/string';
import { LineLink } from '@/constants/contact';

type BasketDetailClientProps = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    details: React.ReactNode;
    gridStyle?: string;
    imageContainerClassName?: string;
  };
};

const BasketDetailClient = ({ product }: BasketDetailClientProps) => {
  const priceFormat = formatPrice(product.price || 0);

  const handleBuyClick = () => {
    const message = encodeURIComponent(
      `Hi, I would like to know more about "${product.title}" at price ฿${priceFormat}`
    );
    window.open(`${LineLink}?text=${message}`, '_blank');
  };

  return (
    <div className="mb-4 min-h-[calc(100dvh-380px)] bg-maroon px-3 py-8 sm:px-6 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="shadow-card-light overflow-hidden rounded-none bg-main-white">
          <div className={cn('grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6', product.gridStyle)}>
            <div
              className={cn(
                'group relative flex items-center justify-center bg-white py-4 sm:py-6',
                product.imageContainerClassName
              )}
            >
              <div className="relative mx-auto h-auto w-full max-w-[480px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={800}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 40vw, 90vw"
                  priority={false}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-4 text-shadow-black sm:p-6 md:p-8">
              <div className="mb-4 sm:mb-6">
                <h1 className="mb-2 text-base font-light leading-tight tracking-wide sm:text-lg md:text-xl lg:text-2xl">
                  {product.title}
                </h1>
                <div className="mt-3 h-[2px] w-12 bg-maroon sm:w-14" />
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="mb-3 text-sm font-light text-maroon sm:mb-4 sm:text-base md:text-lg">
                  What's Inside
                </h3>
                <div className="space-y-1 text-[11px] font-light leading-relaxed text-shadow-black/80 sm:text-sm md:text-base">
                  {product.details}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-lg font-light text-maroon sm:text-xl md:text-2xl lg:text-3xl">
                    ฿{priceFormat}
                  </span>
                  <span className="text-[11px] font-light text-shadow-black/60 sm:text-sm">
                    THB
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <OutlineButton
                  color="primary"
                  size="lg"
                  onClick={handleBuyClick}
                  className="w-full text-sm font-light tracking-wide sm:w-[260px] sm:text-base md:w-[300px]"
                >
                  Order via Line
                </OutlineButton>
                <p className="mt-2 text-[11px] font-light text-shadow-black/60 sm:text-xs md:text-sm">
                  Free consultation • Custom arrangements available
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <div className="h-[1px] w-24 bg-main-white/30" />
        </div>
      </div>
    </div>
  );
};

export default BasketDetailClient;
