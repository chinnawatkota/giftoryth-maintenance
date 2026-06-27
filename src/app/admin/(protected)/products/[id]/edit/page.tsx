import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';
import { updateProduct } from '../../actions';
import { prisma } from '@/lib/prisma';

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { id } = await params;
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
          product={product}
          submitLabel="Save Product"
        />
      </div>
    </div>
  );
};

export default EditProductPage;
