"use client";

import {
  CheckIcon,
  HeartFilledIcon,
  HeartIcon,
  PlusIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

import { categoryLabels } from "../lib/product-query";
import type { Product } from "../types/product.types";
import { ProductVisual } from "./ProductVisual";

const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_8px_25px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 transition-transform hover:-translate-y-1">
      <div className="relative">
        <ProductVisual kind={product.visual} tone={product.tone} name={product.name} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={`${favorite ? "Remove" : "Add"} ${product.name} ${favorite ? "from" : "to"} favorites`}
          aria-pressed={favorite}
          onClick={() => setFavorite((value) => !value)}
          className={`absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white ${favorite ? "text-rose-500" : "text-slate-600"}`}
        >
          {favorite ? <HeartFilledIcon className="size-4" /> : <HeartIcon className="size-4" />}
        </button>
      </div>
      <div className="px-1 pb-1 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {categoryLabels[product.category]}
        </p>
        <h2 className="mt-1 min-h-12 text-[15px] font-semibold leading-6 tracking-tight">
          {product.name}
        </h2>
        <div
          className="mt-1 flex items-center gap-1 text-xs text-slate-500"
          aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}
        >
          <StarFilledIcon className="size-3.5 text-amber-500" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-slate-300">({product.reviewCount})</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="font-semibold">{price.format(product.price)}</span>
            {product.previousPrice && (
              <span className="ml-2 text-sm text-slate-400 line-through">
                {price.format(product.previousPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => setAdded(!added)}
            className={`grid size-10 shrink-0 place-items-center rounded-full text-white transition-colors ${added ? "bg-primary" : "bg-foreground hover:bg-primary"}`}
          >
            {added ? <CheckIcon /> : <PlusIcon />}
          </button>
        </div>
        <p className="sr-only" role="status">
          {added ? `${product.name} added to cart` : ""}
        </p>
      </div>
    </article>
  );
}
