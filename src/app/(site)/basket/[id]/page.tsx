/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import Script from 'next/script';
import BasketDetailClient from './BasketDetailClient';
import {
  generateProductStructuredData,
  generateBreadcrumbStructuredData,
} from '@/components/seo/StructuredData';
import { getSiteUrl } from '@/utils/siteUrl';
import { notFound } from 'next/navigation';
import { getPublishedProductBySlug } from '@/lib/catalog';

type PageParams = Promise<{ id: string }>;

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = await params;
  const product = await getPublishedProductBySlug(id);
  if (!product) {
    return {
      title: 'Basket not found | giftoryth',
    };
  }

  const baseUrl = getSiteUrl();
  const title = `${product.title} - giftoryth`;
  const description = `${product.title} - Premium gift basket available for ฿${product.price ?? 0}. Order via Line for free consultation.`;
  const url = `${baseUrl}/basket/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [product.image],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

const BasketPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  const product = await getPublishedProductBySlug(id);
  const baseUrl = getSiteUrl();

  if (!product) {
    notFound();
  }

  const structuredData = [
    generateProductStructuredData({ ...product!, price: product!.price ?? 0 }),
    generateBreadcrumbStructuredData([
      { name: 'Home', url: `${baseUrl}/` },
      { name: 'Baskets', url: `${baseUrl}/baskets` },
      { name: product!.title, url: `${baseUrl}/basket/${id}` },
    ]),
  ];

  return (
    <>
      <Script
        id="structured-data-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BasketDetailClient product={product!} />
    </>
  );
};

export default BasketPage;
