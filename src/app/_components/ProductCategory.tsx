import ProductCategoryCard from './ProductCategoryCard';

const productCategories = [
  {
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Non-Custom Baskets',
    url: '/baskets',
    className: 'sm:max-w-[360px] md:max-w-[460px] aspect-square',
  },
  {
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Special Custom Design Baskets',
    url: '/baskets#sepcial-custom-design',
    className: 'sm:max-w-[360px] md:max-w-[460px] aspect-square',
  },
  {
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Custom-Gift',
    url: '/custom-gift',
    className:
      'sm:col-span-2 lg:col-span-1 justify-self-center sm:max-h-[360px] md:max-h-[460px] aspect-square',
  },
];

const ProductCategory = () => {
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
