import CustomGiftItemForm from '../CustomGiftItemForm';
import { createCustomGiftItem } from '../actions';
import { getNextCustomGiftSlot } from '@/lib/customGiftPage';

const NewCustomGiftItemPage = async () => {
  const nextSlot = await getNextCustomGiftSlot();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light">New Custom Gift Item</h1>
      <CustomGiftItemForm action={createCustomGiftItem} slot={nextSlot} submitLabel="Create Item" />
    </div>
  );
};

export default NewCustomGiftItemPage;

