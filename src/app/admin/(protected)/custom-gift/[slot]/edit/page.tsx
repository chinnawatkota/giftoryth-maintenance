import { notFound } from 'next/navigation';
import CustomGiftItemForm from '../../CustomGiftItemForm';
import { updateCustomGiftItem } from '../../actions';
import { getCustomGiftPageItems } from '@/lib/customGiftPage';

type EditCustomGiftItemPageProps = {
  params: Promise<{
    slot: string;
  }>;
};

const EditCustomGiftItemPage = async ({ params }: EditCustomGiftItemPageProps) => {
  const { slot } = await params;
  const slotNumber = Number(slot);
  const items = await getCustomGiftPageItems({ includeHidden: true });
  const item = items.find(entry => entry.slot === slotNumber);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light">Edit Custom Gift Item</h1>
      <CustomGiftItemForm action={updateCustomGiftItem} item={item} slot={item.slot} submitLabel="Save Item" />
    </div>
  );
};

export default EditCustomGiftItemPage;

