import Link from "next/link";

import type { Product } from "../types/product.types";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="related-products-title" className="pb-20 lg:pb-28">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
            Keep exploring
          </p>
          <h2
            id="related-products-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl"
          >
            Pairs well with your day.
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm font-semibold text-slate-600 hover:text-foreground sm:block"
        >
          View all products
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
