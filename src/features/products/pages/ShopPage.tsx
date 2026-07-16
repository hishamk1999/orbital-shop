import { Container } from "@/shared/layouts";
import { getProducts } from "../api/get-products";
import { normalizeProductQuery } from "../lib/product-query";
import type { ShopSearchParams } from "../types/product.types";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters";
import { ShopEmptyState } from "../components/ShopStates";
import { ShopToolbar } from "../components/ShopToolbar";

export async function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const query = normalizeProductQuery(await searchParams);
  const result = await getProducts(query);
  const effectiveQuery = { ...query, page: result.page };

  return (
    <main className="flex-1 pb-20 lg:pb-28">
      <Container className="pt-10 lg:pt-14">
        <section className="relative overflow-hidden rounded-[28px] bg-primary-soft px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <span className="absolute -right-20 -top-20 size-64 rounded-full bg-sky-soft/70 blur-3xl" />
          <span className="absolute -bottom-28 left-1/2 size-56 rounded-full bg-peach-soft/70 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
              The complete edit
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              Useful technology,
              <br />
              <span className="text-primary">clearly chosen.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Explore considered tools for sound, work, home, and play. Filter the details; keep the
              good part simple.
            </p>
          </div>
        </section>
        <div className="mt-6">
          <ShopToolbar query={effectiveQuery} total={result.total} />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <ProductFilters query={effectiveQuery} categoryCounts={result.categoryCounts} />
          <section aria-label="Product results" className="min-w-0">
            {result.products.length ? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {result.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  query={effectiveQuery}
                  page={result.page}
                  totalPages={result.totalPages}
                />
              </>
            ) : (
              <ShopEmptyState />
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
