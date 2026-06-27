import Link from 'next/link';
import Image from 'next/image';
import { OutlineButton } from '@/components/buttons';

const PageCover = () => {
  return (
    <div className="relative h-[300px] w-dvw overflow-hidden sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px]">
      <Image
        src="https://images.giftoryth.com/giftoryth-public/images/cover.webp"
        alt="Page Cover"
        fill
        sizes="100vw"
        className="absolute bottom-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-shadow-black/20" />
      <Link href="/baskets" className="absolute inset-0 flex flex-col items-center justify-center">
        <OutlineButton color="secondary" size="xl">
          See the collection
        </OutlineButton>
      </Link>
    </div>
  );
};

export default PageCover;
