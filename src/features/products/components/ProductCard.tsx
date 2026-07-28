"use client";

import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { categoryLabels } from "../lib/product-query";
import type { Product } from "../types/product.types";
import { ProductVisual } from "./ProductVisual";

const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type ProductCardProps = {
  product: Product;
  favorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  onAddCart?: (id: number) => void;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
};

export function ProductCard({
  product,
  favorite,
  onToggleFavorite,
  onAddCart,
  compact = false,
  headingLevel = "h2",
}: ProductCardProps) {
  const [internalFavorite, setInternalFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const isFavorite = favorite ?? internalFavorite;
  const Heading = headingLevel;

  function toggleFavorite() {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
      return;
    }

    setInternalFavorite((value) => !value);
  }

  function addToCart() {
    setAdded(true);
    onAddCart?.(product.id);
  }

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[22px] bg-white p-3 text-foreground shadow-[0_8px_25px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 transition-transform hover:-translate-y-1",
        compact && "flex gap-4 sm:block",
      )}
    >
      <div className={cn("relative", compact && "shrink-0")}>
        <ProductVisual
          kind={product.visual}
          tone={product.tone}
          name={product.name}
          className={compact ? "h-32 w-32 sm:h-48 sm:w-full" : undefined}
        />
        <Link
          href={`/shop/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        />
        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`}
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
          className={cn(
            "absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white",
            isFavorite && "text-rose-500",
          )}
        >
          <Heart className="size-4" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="min-w-0 px-1 pb-1 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {categoryLabels[product.category]}
        </p>
        <Heading className="mt-1 min-h-12 text-[15px] font-semibold leading-6 tracking-tight">
          <Link href={`/shop/${product.slug}`} className="hover:text-green-700">
            {product.name}
          </Link>
        </Heading>
        <div
          className="mt-1 flex items-center gap-1 text-xs text-slate-500"
          aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}
        >
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
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
          <Button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={addToCart}
            size="icon-lg"
            className={cn(
              "shrink-0 rounded-full",
              added ? "bg-primary" : "bg-foreground hover:bg-primary",
            )}
          >
            {added ? <Check data-icon="inline-start" /> : <ShoppingBag data-icon="inline-start" />}
          </Button>
        </div>
        {!onAddCart && added ? (
          <p className="sr-only" role="status">
            {product.name} added to cart
          </p>
        ) : null}
      </div>
    </article>
  );
}
