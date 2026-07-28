"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/shared/components/ui/button";
import type { Product, ProductGalleryItem } from "../types/product.types";
import { ProductVisual } from "./ProductVisual";

type ProductGalleryProps = {
  product: Product;
  items: ProductGalleryItem[];
};

export function ProductGallery({ product, items }: ProductGalleryProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedIndex = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <section aria-label={`${product.name} image gallery`} className="min-w-0">
      <div className="relative overflow-hidden rounded-[28px] bg-surface-muted">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%]"
                aria-hidden={index !== selectedIndex}
              >
                <ProductVisual
                  kind={product.visual}
                  tone={item.tone}
                  name={`${product.name}, ${item.label}`}
                  className="h-[min(70vh,620px)] min-h-105 rounded-none sm:h-145"
                  iconClassName="size-32 sm:size-44"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-foreground/15 to-transparent p-4 pt-20 sm:p-6">
          <p className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            {items[selectedIndex]?.label}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
            <Expand aria-hidden="true" />
            Drag to explore
          </span>
        </div>

        <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Show previous product image"
            className="rounded-full bg-white/90 shadow-sm backdrop-blur"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Show next product image"
            className="rounded-full bg-white/90 shadow-sm backdrop-blur"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div
        className="mt-3 flex gap-3 overflow-x-auto px-0.5 pt-1 pb-2"
        aria-label="Choose a product image"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Show ${item.label.toLowerCase()}`}
            aria-pressed={selectedIndex === index}
            className="shrink-0 rounded-[18px] bg-white p-1.5 ring-1 ring-slate-200 transition-[box-shadow,transform] hover:-translate-y-0.5 aria-pressed:ring-2 aria-pressed:ring-primary-bright"
          >
            <ProductVisual
              kind={product.visual}
              tone={item.tone}
              name={product.name}
              decorative
              className="h-20 w-20 rounded-[13px] sm:h-24 sm:w-24"
              iconClassName="size-10 sm:size-12"
            />
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Image {selectedIndex + 1} of {items.length}: {items[selectedIndex]?.label}
      </p>
    </section>
  );
}
