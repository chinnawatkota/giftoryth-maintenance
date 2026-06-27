import ProductForm from '../ProductForm';
import { createProduct } from '../actions';
import { prisma } from '@/lib/prisma';

const NewProductPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  return (
    <div>
      <h1 className="text-2xl font-light">New Product</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} categories={categories} submitLabel="Create Product" />
      </div>
    </div>
  );
};

export default NewProductPage;
