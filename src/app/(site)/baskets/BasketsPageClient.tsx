'use client';

import { useRef } from 'react';
import { OutlineButton } from '@/components/buttons';
import { ProductCard } from '@/components/cards';
import type { CatalogCategorySection } from '@/lib/catalog';
import { cn } from '@/utils';

type BasketsPageClientProps = {
  sections: CatalogCategorySection[];
};

const BasketsPageClient = ({ sections }: BasketsPageClientProps) => {
  const sectionRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  return (
    <div className="min-h-[calc(100dvh-290px)]">
      <div className="flex flex-wrap justify-center gap-4 px-2 md:justify-start md:px-8">
        {sections.map(section => (
          <OutlineButton
            key={section.id}
            color="primary"
            size="lg"
            onClick={() =>
              sectionRefs.current[section.id]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
          >
            {section.name}
          </OutlineButton>
        ))}
      </div>

      {sections.map((section, index) => {
        const isSpecialCustomDesign = section.slug === 'special-custom-design';

        return (
          <section key={section.id} className={index === sections.length - 1 ? 'mb-4' : undefined}>
            <div className="flex h-fit w-full flex-col px-4 py-8 pb-[30px] md:px-8 md:py-10 lg:py-12 xl:py-14">
              <h1
                ref={element => {
                  sectionRefs.current[section.id] = element;
                }}
                id={section.slug}
                className="mb-2 scroll-mt-24 text-lg font-extralight leading-tight tracking-wide md:text-xl xl:text-2xl"
              >
                {section.name}
              </h1>
              <div className="mt-4 h-[2px] w-12 bg-maroon md:w-16" />
            </div>
            <div
              className={cn(
                'grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
                index === sections.length - 1 && 'mb-4'
              )}
            >
              {section.products.map(basket => (
                <ProductCard
                  key={basket.image + basket.title}
                  {...basket}
                  className={isSpecialCustomDesign && 'relative place-items-baseline bg-maroon'}
                  imageClassName={
                    isSpecialCustomDesign ? basket.imageClassName || 'abs' : basket.imageClassName
                  }
                  defaultBackground={isSpecialCustomDesign}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default BasketsPageClient;
