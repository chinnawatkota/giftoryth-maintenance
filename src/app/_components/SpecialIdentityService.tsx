import { getHomeIdentityItems } from '@/lib/homeIdentity';
import { cn } from '@/utils';
import Image from 'next/image';
import Topic from './Topic';

const SpecialIdentityService = async () => {
  const identityServiceItems = await getHomeIdentityItems();

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Topic title="Special Identity Service" />

        <div className="mx-auto hidden max-w-[1200px] gap-8 lg:grid lg:grid-cols-3 lg:grid-rows-4">
          {identityServiceItems.map(item => (
            <div
              key={item.id}
              className={cn(
                'hover:shadow-card group relative aspect-[13/14] size-full cursor-pointer overflow-hidden transition-all duration-500',
                item.className,
                item.desktopGrid
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 40vw, 90vw"
                className={cn(
                  'h-full w-full object-cover transition-transform duration-700 group-hover:scale-110',
                  item.imageClassName
                )}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/60 via-shadow-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:gap-6 lg:hidden">
          {identityServiceItems.slice(0, 8).map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'hover:shadow-card group relative aspect-[13/14] size-full cursor-pointer overflow-hidden transition-all duration-500',
                item.className,
                index === 0 ? 'row-span-2' : index === 7 ? 'row-span-2' : 'row-span-1'
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/60 via-shadow-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {identityServiceItems.slice(0, 8).map(item => (
            <div
              key={item.id}
              className={cn(
                'hover:shadow-card group relative aspect-[13/14] size-full cursor-pointer overflow-hidden transition-all duration-500',
                item.className
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shadow-black/60 via-shadow-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialIdentityService;
