import Link from 'next/link';
import Image from 'next/image';
import Topic from './Topic';

const CustomGift = () => {
  return (
    <>
      <Topic title="Custom Gift" />
      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 px-4 md:grid-cols-2 md:px-8">
        <Link
          className="hover:shadow-card-light card aspect-video w-full rounded-none bg-shadow-black bg-opacity-20"
          href="/custom-gift"
        >
          <Image
            src="https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/signature.webp"
            alt="Signature gift"
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 90vw"
            className="h-full w-full object-cover"
          />
        </Link>
        <Link
          className="hover:shadow-card-light flex-2 card relative aspect-video w-full flex-row items-center justify-center rounded-none bg-beige/30"
          href="/custom-gift"
        >
          <Image
            src="https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/bow.webp"
            alt="Bow"
            width={400}
            height={400}
            className="h-3/5 object-cover"
          />
          <Image
            src="https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/bow-bag.webp"
            alt="Bow bag"
            width={400}
            height={400}
            className="h-3/4 object-cover"
          />
        </Link>
      </div>
    </>
  );
};

export default CustomGift;
