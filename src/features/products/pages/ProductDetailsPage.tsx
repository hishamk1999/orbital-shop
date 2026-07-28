import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/layouts";
import { catalog } from "../data/catalog";
import { categoryLabels } from "../lib/product-query";
import type { ProductDetails } from "../types/product.types";
import { ProductDetailsSections } from "../components/ProductDetailsSections";
import { ProductGallery } from "../components/ProductGallery";
import { ProductPurchasePanel } from "../components/ProductPurchasePanel";
import { RelatedProducts } from "../components/RelatedProducts";

export function ProductDetailsPage({ details }: { details: ProductDetails }) {
  const { product } = details;
  const relatedProducts = catalog
    .filter((item) => item.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  return (
    <main className="flex-1 overflow-x-hidden">
      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-6 text-xs text-slate-500">
          <Link href="/" aria-label="Home" className="rounded-sm hover:text-foreground">
            <Home className="size-3.5" aria-hidden="true" />
          </Link>
          <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
            {categoryLabels[product.category]}
          </Link>
          <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
          <span className="max-w-42 truncate font-medium text-foreground sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-12 xl:gap-16">
          <ProductGallery product={product} items={details.gallery} />
          <ProductPurchasePanel details={details} />
        </div>

        <ProductDetailsSections details={details} />
        <RelatedProducts products={relatedProducts} />
      </Container>
    </main>
  );
}
