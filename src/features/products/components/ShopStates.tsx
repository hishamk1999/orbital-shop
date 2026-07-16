"use client";

import { ExclamationTriangleIcon, MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "@/shared/components";

export function ShopEmptyState() {
  return (
    <div className="rounded-[22px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
        <MagnifyingGlassIcon className="size-6" />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-[-0.04em]">
        No products match these choices
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Try a broader search or clear the filters to see the full collection.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Clear filters
      </Link>
    </div>
  );
}

export function ShopErrorState({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-350 flex-1 items-center justify-center px-5 py-24 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-100 text-danger">
          <ExclamationTriangleIcon className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">The catalog didn’t load</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The product service could not be reached. Your filters are still here, so you can try
          again safely.
        </p>
        <Button onClick={reset} variant="dark" className="mt-6">
          <ReloadIcon /> Try again
        </Button>
      </div>
    </main>
  );
}

export function ShopLoading() {
  return (
    <main aria-busy="true" aria-label="Loading products" className="flex-1 pb-20">
      <div className="mx-auto w-full max-w-350 animate-pulse px-5 py-10 lg:px-8 lg:py-14">
        <div className="h-5 w-28 rounded-full bg-slate-200" />
        <div className="mt-5 h-12 max-w-xl rounded-2xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-md rounded-xl bg-slate-100" />
        <div className="mt-10 h-28 rounded-[22px] bg-white ring-1 ring-slate-100" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="hidden h-135 rounded-[22px] bg-white ring-1 ring-slate-100 lg:block" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="rounded-[22px] bg-white p-3 ring-1 ring-slate-100">
                <div className="h-60 rounded-[18px] bg-slate-200" />
                <div className="mt-4 h-3 w-20 rounded bg-slate-200" />
                <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-6 h-8 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading products
      </span>
    </main>
  );
}
