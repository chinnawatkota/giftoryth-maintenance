import ProductCategoryCard from './ProductCategoryCard';
import { getHomeCatalogItems } from '@/lib/homeCatalog';

const ProductCategory = async () => {
  const productCategories = await getHomeCatalogItems();

  return (
    <>
      <div className="mx-auto my-10 h-[2px] w-24 bg-shadow-black" />

      <div className="mt-10 grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:gap-6 md:px-8 lg:grid-cols-3 lg:gap-8 lg:px-16 xl:px-32 2xl:gap-24">
        {productCategories.map((category, index) => (
          <ProductCategoryCard
            key={`${category.title}-${index}`}
            image={category.image}
            title={category.title}
            url={category.url}
            className={category.className}
          />
        ))}
      </div>
    </>
  );
};

export default ProductCategory;
