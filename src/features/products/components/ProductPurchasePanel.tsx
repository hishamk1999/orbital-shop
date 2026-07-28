"use client";

import { Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";

import { Button as CommerceButton } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { categoryLabels } from "../lib/product-query";
import type { ProductDetails } from "../types/product.types";

const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductPurchasePanel({ details }: { details: ProductDetails }) {
  const { product } = details;
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(details.colors[0].name);

  function addToCart() {
    setAdded(true);
  }

  return (
    <div className="lg:sticky lg:top-34">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
        {categoryLabels[product.category]} · Orbital edit
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{product.description}</p>

      <a
        href="#reviews"
        className="mt-5 inline-flex items-center gap-2 rounded-md text-sm text-slate-600 hover:text-foreground"
      >
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
          {product.rating.toFixed(1)}
        </span>
        <span className="text-slate-300" aria-hidden="true">
          ·
        </span>
        <span>{product.reviewCount} verified reviews</span>
      </a>

      <div className="mt-7 flex items-end gap-3">
        <span className="text-3xl font-semibold tracking-tight">{price.format(product.price)}</span>
        {product.previousPrice && (
          <span className="pb-1 text-base text-slate-400 line-through">
            {price.format(product.previousPrice)}
          </span>
        )}
        {product.badge && (
          <span className="mb-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-green-700">
            {product.badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-500">or 4 interest-free payments of $62.25</p>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold">
          Finish: <span className="font-normal text-slate-500">{selectedColor}</span>
        </legend>
        <div className="mt-3 flex gap-3">
          {details.colors.map((color) => (
            <label key={color.name} className="relative">
              <input
                type="radio"
                name="finish"
                value={color.name}
                checked={selectedColor === color.name}
                onChange={() => setSelectedColor(color.name)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full border-4 border-white shadow-[0_0_0_1px_#cbd5e1] transition peer-checked:shadow-[0_0_0_2px_#22c55e]"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.name && (
                  <Check
                    className={cn(
                      "size-4",
                      color.name === "Cloud" ? "text-foreground" : "text-white",
                    )}
                  />
                )}
              </span>
              <span className="sr-only">{color.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div
          className="flex h-12 shrink-0 items-center justify-between rounded-full border border-slate-200 bg-white px-1"
          aria-label="Quantity"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
            className="rounded-full"
          >
            <Minus />
          </Button>
          <span className="min-w-9 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={() => setQuantity((value) => Math.min(9, value + 1))}
            disabled={quantity === 9}
            aria-label="Increase quantity"
            className="rounded-full"
          >
            <Plus />
          </Button>
        </div>
        <CommerceButton
          type="button"
          onClick={addToCart}
          disabled={added}
          className="h-12 flex-1"
        >
          {added ? <Check className="size-4" /> : null}
          {added ? "Added to bag" : `Add ${quantity} to bag`}
        </CommerceButton>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
          onClick={() => setFavorite((value) => !value)}
          className="size-12 rounded-full"
        >
          <Heart className={favorite ? "fill-rose-500 text-rose-500" : undefined} />
        </Button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {added ? `${quantity} ${product.name} added to your bag in ${selectedColor}.` : ""}
      </p>

      <div className="mt-7 grid gap-3 rounded-[22px] bg-slate-50 p-4 sm:grid-cols-2">
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-green-700 shadow-sm">
            <Truck className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">Free two-day delivery</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Arrives in 2–3 business days.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-violet-700 shadow-sm">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">Try it for 30 days</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Easy returns and a 2-year warranty.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
