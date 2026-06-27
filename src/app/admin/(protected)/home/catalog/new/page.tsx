import HomeCatalogItemForm from '../HomeCatalogItemForm';
import { createHomeCatalogItem } from '../actions';
import { getNextHomeCatalogSlot } from '@/lib/homeCatalog';

const NewHomeCatalogItemPage = async () => {
  const nextSlot = await getNextHomeCatalogSlot();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light">New Home Catalog Item</h1>
      <HomeCatalogItemForm action={createHomeCatalogItem} slot={nextSlot} submitLabel="Create Item" />
    </div>
  );
};

export default NewHomeCatalogItemPage;

