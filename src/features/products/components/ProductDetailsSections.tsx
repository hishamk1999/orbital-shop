import {
  BatteryCharging,
  Bluetooth,
  CheckCircle2,
  Headphones,
  PackageCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";
import type { ProductDetails } from "../types/product.types";
import { ProductVisual } from "./ProductVisual";

const highlightIcons = [Sparkles, BatteryCharging, Headphones, Bluetooth];
const ratingDistribution = [
  { stars: 5, value: 86 },
  { stars: 4, value: 10 },
  { stars: 3, value: 3 },
  { stars: 2, value: 1 },
  { stars: 1, value: 0 },
];

export function ProductDetailsSections({ details }: { details: ProductDetails }) {
  const { product } = details;

  return (
    <>
      <section
        aria-labelledby="highlights-title"
        className="mt-16 rounded-[28px] bg-foreground px-6 py-8 text-white sm:px-10 sm:py-10 lg:mt-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              The short version
            </p>
            <h2
              id="highlights-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl"
            >
              More listening.
              <br />
              Less adjusting.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {details.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index] ?? CheckCircle2;

              return (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-slate-100">{highlight}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="description"
        aria-labelledby="description-title"
        className="grid gap-8 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28"
      >
        <div className="order-2 lg:order-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
            {details.story.eyebrow}
          </p>
          <h2
            id="description-title"
            className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl"
          >
            {details.story.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            {details.story.description}
          </p>
          <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {details.specifications.map((specification) => (
              <div key={specification.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {specification.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium">{specification.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="order-1 lg:order-2">
          <ProductVisual
            kind={product.visual}
            tone="sky"
            name={`${product.name} comfort detail`}
            className="h-105 rounded-[28px] sm:h-130"
            iconClassName="size-32 sm:size-40"
          />
        </div>
      </section>

      <section
        aria-labelledby="box-title"
        className="grid gap-8 rounded-[28px] bg-primary-soft p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"
      >
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-white text-green-700 shadow-sm">
            <PackageCheck className="size-5" aria-hidden="true" />
          </span>
          <h2 id="box-title" className="mt-5 text-3xl font-semibold tracking-[-0.05em]">
            Everything you need.
          </h2>
          <p className="mt-3 max-w-md leading-7 text-slate-600">
            Thoughtful essentials, protected in recyclable paper packaging. No mystery cables.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {details.boxContents.map((item) => (
            <li
              key={item}
              className="flex min-h-16 items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 text-sm font-medium"
            >
              <CheckCircle2 className="size-4 shrink-0 text-green-700" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-32 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
              From everyday listeners
            </p>
            <h2
              id="reviews-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl"
            >
              Real notes, after real use.
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Reviews are collected from verified Orbital orders.
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[22px] bg-slate-50 p-6" aria-label="Rating summary">
            <div className="flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-[-0.06em]">
                {product.rating.toFixed(1)}
              </span>
              <span className="pb-1 text-sm text-slate-500">out of 5</span>
            </div>
            <div className="mt-3 flex gap-1 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-500">Based on {product.reviewCount} reviews</p>
            <div className="mt-6 flex flex-col gap-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="grid grid-cols-[24px_1fr_32px] items-center gap-2">
                  <span className="text-xs text-slate-500">{item.stars}</span>
                  <Progress value={item.value} aria-label={`${item.value}% gave ${item.stars} stars`} />
                  <span className="text-right text-xs text-slate-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex flex-col gap-4">
            {details.reviews.map((review) => (
              <article key={review.id} className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-full bg-sky-soft text-sm font-bold text-slate-700"
                    >
                      {review.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{review.author}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {review.verified ? "Verified buyer" : "Customer"} · {review.date}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex gap-0.5 text-amber-400"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "size-3.5",
                          index < review.rating ? "fill-current" : "text-slate-200",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="mt-5 font-semibold">{review.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
