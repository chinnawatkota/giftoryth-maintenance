import { cn } from '@/utils';

type TopicProps = {
  title: string;
  className?: string;
};

const Topic = ({ title, className }: TopicProps) => {
  return (
    <div
      className={cn(
        'pb:[30px] flex h-fit w-full flex-col items-center justify-center bg-main-white py-8 md:py-10 lg:py-12 xl:py-14',
        className
      )}
    >
      <h2 className="mb-4 text-lg font-extralight tracking-wide md:text-xl xl:text-2xl">{title}</h2>
      <div className="mx-auto h-[2px] w-24 bg-shadow-black" />
    </div>
  );
};

export default Topic;
