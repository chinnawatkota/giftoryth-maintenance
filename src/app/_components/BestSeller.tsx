import { bestSellerProducts } from '@/constants/bestSellers';
import Topic from './Topic';
import BestSellerCard from './BestSellerCard';

const BestSeller = () => {
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
              isBestSeller={product.isBestSeller}
              isEvenIem={index % 2 === 0}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BestSeller;
