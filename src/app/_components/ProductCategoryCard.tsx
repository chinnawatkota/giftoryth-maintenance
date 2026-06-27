import Link from 'next/link';
import Image from 'next/image';

const ProductCategoryCard = ({
  image,
  title,
  url,
  className,
}: Product.ProductCategoryCardProps) => {
  return (
    <Link href={url} className={className}>
      <div className="hover:shadow-card card relative aspect-square w-full cursor-pointer overflow-hidden rounded-none bg-shadow-black bg-opacity-20 shadow-sm">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-shadow-black/20 transition-opacity duration-300">
          <h2 className="w-4/5 text-center !text-lg uppercase leading-relaxed tracking-wide text-main-white md:text-xl xl:text-2xl">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCategoryCard;
