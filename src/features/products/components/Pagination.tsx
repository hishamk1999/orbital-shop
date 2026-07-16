import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { queryToSearchParams } from "../lib/product-query";
import type { ProductQuery } from "../types/product.types";

function hrefFor(query: ProductQuery, page: number) {
  const params = queryToSearchParams(query, { page });
  return `/shop${params.size ? `?${params.toString()}` : ""}`;
}

export function Pagination({
  query,
  page,
  totalPages,
}: {
  query: ProductQuery;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Product pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(query, page - 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold hover:border-primary-bright"
        >
          <ChevronLeftIcon /> Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-300"
        >
          <ChevronLeftIcon /> Previous
        </span>
      )}
      {pages.map((number) => (
        <Link
          key={number}
          href={hrefFor(query, number)}
          aria-current={number === page ? "page" : undefined}
          aria-label={`Page ${number}`}
          className={`grid size-11 place-items-center rounded-full text-sm font-semibold ${number === page ? "bg-foreground text-white" : "border border-slate-200 bg-white hover:border-primary-bright"}`}
        >
          {number}
        </Link>
      ))}
      {page < totalPages ? (
        <Link
          href={hrefFor(query, page + 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold hover:border-primary-bright"
        >
          Next <ChevronRightIcon />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-300"
        >
          Next <ChevronRightIcon />
        </span>
      )}
    </nav>
  );
}
