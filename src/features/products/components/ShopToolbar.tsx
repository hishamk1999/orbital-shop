import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Button, Input } from "@/shared/components";
import type { ProductQuery } from "../types/product.types";

export function ShopToolbar({ query, total }: { query: ProductQuery; total: number }) {
  return (
    <form
      action="/shop"
      className="grid gap-4 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end"
    >
      {query.categories.map((category) => (
        <input key={category} type="hidden" name="category" value={category} />
      ))}
      {query.minPrice !== undefined && (
        <input type="hidden" name="minPrice" value={query.minPrice} />
      )}
      {query.maxPrice !== undefined && (
        <input type="hidden" name="maxPrice" value={query.maxPrice} />
      )}
      <label className="block">
        <span className="mb-2 flex items-center justify-between text-sm font-semibold">
          Search the catalog{" "}
          <span className="font-normal text-slate-500">
            {total} {total === 1 ? "result" : "results"}
          </span>
        </span>
        <span className="relative block">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="q"
            defaultValue={query.q}
            placeholder="Try “headphones” or “workspace”"
            className="pl-10"
          />
        </span>
      </label>
      <label className="block text-sm font-semibold">
        <span className="mb-2 block">Sort by</span>
        <select
          name="sort"
          defaultValue={query.sort}
          className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-green-100"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>
      <Button type="submit" className="md:px-6">
        Update
      </Button>
    </form>
  );
}
