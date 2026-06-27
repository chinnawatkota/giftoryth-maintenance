import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/utils/string';
import { cn } from '@/utils/className';
import ProductDetailsList from '@/components/products/ProductDetailsList';

const ProductCard = ({
  image,
  cardImage,
  title,
  price,
  details,
  id,
  className,
  imageClassName,
  disabledLink,
  defaultBackground = false,
  onClick,
}: Product.ProductCardProps) => {
  const priceFormat = formatPrice(price || 0);

  const href = disabledLink ? '#' : `/basket/${id}`;

  return (
    <Link
      href={href}
      className={cn(
        'hover:shadow-card group card relative aspect-[2/3] max-h-[550px] w-full cursor-pointer overflow-hidden rounded-none bg-white bg-opacity-70 shadow-sm md:max-h-full',
        className
      )}
      onClick={() => onClick?.()}
    >
      {defaultBackground && (
        <Image
          src="/images/background-product-2.webp"
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 30vw, 80vw"
          className="absolute inset-0 h-full w-full object-cover"
          priority={false}
        />
      )}
      <Image
        src={cardImage || image}
        alt={title || 'Product image'}
        fill
        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 24vw, (min-width: 640px) 48vw, 90vw"
        className={cn('h-[calc(100%-90px)] w-full object-cover', imageClassName)}
      />
      {(title || details) && (
        <div className="absolute inset-0 flex items-end transition-opacity duration-200 group-hover:bg-shadow-black/25">
          <div
            className={cn(
              'card-body translate-y-[calc(100%-90px)] transform overflow-y-auto bg-main-white transition-transform duration-200 group-hover:-translate-y-12 md:translate-y-[calc(100%-105px)]',
              !title && 'translate-y-[calc(100%-10px)] md:translate-y-[calc(100%-15px)]'
            )}
          >
            <h2 className="card-title text-base !font-extralight text-shadow-black md:text-lg">
              {title}
            </h2>
            {details && (
              <div className="text-xs font-extralight text-shadow-black md:text-sm">
                <ProductDetailsList details={details} />
              </div>
            )}
          </div>
        </div>
      )}
      {price && (
        <div className="absolute bottom-0 left-0 flex h-12 w-full items-center bg-main-white px-6 md:h-14">
          <p className="text-xl font-light text-maroon">฿ {priceFormat}</p>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
