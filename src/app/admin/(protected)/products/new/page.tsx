import ProductForm from '../ProductForm';
import { createProduct } from '../actions';
import { prisma } from '@/lib/prisma';

type NewProductPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  'slug-exists': 'This slug is already used by another product. Please choose a different slug.',
};

const NewProductPage = async ({ searchParams }: NewProductPageProps) => {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  return (
    <div>
      <h1 className="text-2xl font-light">New Product</h1>
      <div className="mt-8">
        <ProductForm
          action={createProduct}
          categories={categories}
          errorMessage={error ? errorMessages[error] : undefined}
          submitLabel="Create Product"
        />
      </div>
    </div>
  );
};

export default NewProductPage;
