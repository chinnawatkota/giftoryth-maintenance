import BestSeller from './BestSeller';
import CustomGift from './CustomGift';
import PageCover from './PageCover';
import ProductCategory from './ProductCategory';
import SpecialIdentityService from './SpecialIdentityService';

const HomeContent = () => {
  return (
    <div className="mb-8">
      <PageCover />
      <SpecialIdentityService />
      <BestSeller />
      <CustomGift />
      <ProductCategory />
    </div>
  );
};

export default HomeContent;
