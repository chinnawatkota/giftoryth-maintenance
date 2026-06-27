import { notFound } from 'next/navigation';
import HomeCatalogItemForm from '../../HomeCatalogItemForm';
import { updateHomeCatalogItem } from '../../actions';
import { getHomeCatalogItems } from '@/lib/homeCatalog';

type EditHomeCatalogItemPageProps = {
  params: Promise<{
    slot: string;
  }>;
};

const EditHomeCatalogItemPage = async ({ params }: EditHomeCatalogItemPageProps) => {
  const { slot } = await params;
  const slotNumber = Number(slot);
  const items = await getHomeCatalogItems({ includeHidden: true });
  const item = items.find(entry => entry.slot === slotNumber);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light">Edit Home Catalog Item</h1>
      <HomeCatalogItemForm action={updateHomeCatalogItem} item={item} slot={item.slot} submitLabel="Save Item" />
    </div>
  );
};

export default EditHomeCatalogItemPage;

