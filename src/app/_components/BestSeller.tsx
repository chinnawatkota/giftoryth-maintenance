import Topic from './Topic';
import BestSellerCard from './BestSellerCard';
import { getBestSellerProducts } from '@/lib/catalog';

const BestSeller = async () => {
  const bestSellerProducts = await getBestSellerProducts();

  if (bestSellerProducts.length === 0) {
    return null;
  }

  return (
    <>
      <Topic title="Best Sellers" />
      <div className="sm:flex-2 md:flex-3 lg:flex-4 carousel carousel-center w-full flex-1 space-x-6 rounded-box px-4 md:px-8">
        {bestSellerProducts.map((product, index) => (
          <div className="carousel-item" key={product.image}>
            <BestSellerCard
              image={product.image}
              title={product.title}
              price={product.price}
              isBestSeller
              isEvenIem={index % 2 === 0}
              href={`/basket/${product.id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BestSeller;
