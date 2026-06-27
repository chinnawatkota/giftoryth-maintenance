import Link from 'next/link';
import Image from 'next/image';
import { BestSellerBadge } from '@/components/icons';
import { formatPrice } from '@/utils/string';

type BestSellerCardProps = Product.BestSellerCardProps & {
  href?: string;
};

const BestSellerCard = ({
  image,
  title,
  price,
  details,
  isBestSeller = false,
  isEvenIem = false,
  href = '/baskets',
}: BestSellerCardProps) => {
  const badgeVariant = isEvenIem ? 'even' : 'odd';
  const priceFormat = price ? formatPrice(price) : undefined;

  return (
    <Link
      href={href}
      className="hover:shadow-card group card relative aspect-[3/4] h-[300px] w-full cursor-pointer overflow-hidden rounded-none bg-shadow-black bg-opacity-20 shadow-sm sm:h-[330px] md:h-[360px] lg:h-[390px]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-end bg-shadow-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="card-body translate-y-full transform bg-main-white transition-transform duration-300 group-hover:translate-y-0">
          <h2 className="card-title !text-[20px] !font-extralight text-shadow-black">{title}</h2>
          {details && <div className="text-sm font-extralight text-shadow-black">{details}</div>}
          {priceFormat && <p className="text-2xl font-light text-maroon">฿ {priceFormat}</p>}
        </div>
      </div>
      {isBestSeller && (
        <div className="absolute left-0 top-0">
          <BestSellerBadge variant={badgeVariant} width={100} height={36} />
        </div>
      )}
    </Link>
  );
};

export default BestSellerCard;
