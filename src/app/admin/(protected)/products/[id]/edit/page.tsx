import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';
import { updateProduct } from '../../actions';
import { prisma } from '@/lib/prisma';

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  'slug-exists': 'This slug is already used by another product. Please choose a different slug.',
};

const EditProductPage = async ({ params, searchParams }: EditProductPageProps) => {
  const { id } = await params;
  const { error } = await searchParams;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-light">Edit Product</h1>
      <div className="mt-8">
        <ProductForm
          action={updateProduct}
          categories={categories}
          errorMessage={error ? errorMessages[error] : undefined}
          product={product}
          submitLabel="Save Product"
        />
      </div>
    </div>
  );
};

export default EditProductPage;
