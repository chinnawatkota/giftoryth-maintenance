import BestSeller from './BestSeller';
import CustomGift from './CustomGift';
import PageCover from './PageCover';
import ProductCategory from './ProductCategory';
import SpecialIdentityService from './SpecialIdentityService';
import { getHomeCoverImage } from '@/lib/siteSettings';

const HomeContent = async () => {
  const homeCoverImage = await getHomeCoverImage();

  return (
    <div className="mb-8">
      <PageCover imageUrl={homeCoverImage} />
      <SpecialIdentityService />
      <BestSeller />
      <CustomGift />
      <ProductCategory />
    </div>
  );
};

export default HomeContent;
