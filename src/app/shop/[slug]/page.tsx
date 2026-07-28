import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProduct, getProductSlugs, ProductDetailsPage } from "@/features/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = await getProduct(slug);

  if (!details) {
    return { title: "Product not found" };
  }

  return {
    title: details.product.name,
    description: details.product.description,
    alternates: { canonical: `/shop/${details.product.slug}` },
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params;
  const details = await getProduct(slug);

  if (!details) {
    notFound();
  }

  return <ProductDetailsPage details={details} />;
}
