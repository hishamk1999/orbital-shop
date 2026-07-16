"use client";

import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button, Input } from "@/shared/components";
import { categoryLabels } from "../lib/product-query";
import type { CategoryCount, ProductQuery } from "../types/product.types";

export function ProductFilters({
  query,
  categoryCounts,
}: {
  query: ProductQuery;
  categoryCounts: CategoryCount[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = new URLSearchParams(searchParams.toString());
    next.delete("category");
    data.getAll("category").forEach((category) => next.append("category", String(category)));
    for (const key of ["minPrice", "maxPrice"]) {
      const value = String(data.get(key) ?? "").trim();
      if (value) next.set(key, value);
      else next.delete(key);
    }
    next.delete("page");
    router.push(`/shop${next.size ? `?${next.toString()}` : ""}`);
    setOpen(false);
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams.toString());
    ["category", "minPrice", "maxPrice", "page"].forEach((key) => next.delete(key));
    router.push(`/shop${next.size ? `?${next.toString()}` : ""}`);
    setOpen(false);
  }

  return (
    <>
      <aside className="hidden lg:block" aria-label="Product filters">
        <div className="sticky top-32 rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
          <FilterForm
            idPrefix="desktop"
            query={query}
            counts={categoryCounts}
            onSubmit={apply}
            onClear={clearFilters}
          />
        </div>
      </aside>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold shadow-sm lg:hidden"
      >
        <MixerHorizontalIcon /> Filters{" "}
        {query.categories.length > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-primary text-xs text-white">
            {query.categories.length}
          </span>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-drawer-title"
            className="absolute inset-y-0 right-0 w-[min(90vw,390px)] overflow-y-auto bg-background p-5 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="filter-drawer-title" className="text-xl font-semibold tracking-[-0.04em]">
                Filter products
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close filter drawer"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-white text-slate-600 shadow-sm"
              >
                <Cross2Icon className="size-5" />
              </button>
            </div>
            <FilterForm
              idPrefix="mobile"
              query={query}
              counts={categoryCounts}
              onSubmit={apply}
              onClear={clearFilters}
            />
          </div>
        </div>
      )}
    </>
  );
}

function FilterForm({
  idPrefix,
  query,
  counts,
  onSubmit,
  onClear,
}: {
  idPrefix: string;
  query: ProductQuery;
  counts: CategoryCount[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Categories</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-primary hover:text-green-700"
        >
          Clear
        </button>
      </div>
      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Product categories</legend>
        {counts.map(({ category, count }) => {
          const id = `${idPrefix}-${category}`;
          return (
            <label
              key={category}
              htmlFor={id}
              className="flex min-h-9 cursor-pointer items-center gap-3 text-sm text-slate-700"
            >
              <input
                id={id}
                name="category"
                value={category}
                type="checkbox"
                defaultChecked={query.categories.includes(category)}
                className="size-4 rounded border-slate-300 accent-green-600"
              />
              <span>{categoryLabels[category]}</span>
              <span className="ml-auto text-xs text-slate-400">{count}</span>
            </label>
          );
        })}
      </fieldset>
      <fieldset className="mt-8 border-t border-slate-200 pt-6">
        <legend className="font-semibold">Price range</legend>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-slate-500" htmlFor={`${idPrefix}-min-price`}>
            Minimum
            <Input
              id={`${idPrefix}-min-price`}
              name="minPrice"
              type="number"
              min="0"
              max="2000"
              defaultValue={query.minPrice}
              placeholder="$0"
              className="mt-2"
            />
          </label>
          <label className="text-xs font-medium text-slate-500" htmlFor={`${idPrefix}-max-price`}>
            Maximum
            <Input
              id={`${idPrefix}-max-price`}
              name="maxPrice"
              type="number"
              min="0"
              max="2000"
              defaultValue={query.maxPrice}
              placeholder="$800"
              className="mt-2"
            />
          </label>
        </div>
      </fieldset>
      <Button type="submit" className="mt-7 w-full">
        Apply filters
      </Button>
    </form>
  );
}
