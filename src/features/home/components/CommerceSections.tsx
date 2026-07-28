import React, { useEffect, useState, Fragment } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Gamepad2,
  Headphones,
  Laptop,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { catalog, ProductCard } from "@/features/products";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";

const trendingProducts = catalog.filter((product) =>
  ["drift-mouse", "nova-controller", "home-hub"].includes(product.slug),
);
const dealProducts = catalog.filter((product) =>
  ["pulse-charger", "mellow-buds", "flux-controller"].includes(product.slug),
);
const dealProgress: Record<string, number> = {
  "pulse-charger": 68,
  "mellow-buds": 81,
  "flux-controller": 52,
};
type SharedProps = {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddCart: (id: number) => void;
};
export function CommerceSections({ favorites, onToggleFavorite, onAddCart }: SharedProps) {
  const [seconds, setSeconds] = useState(3 * 3600 + 26 * 60 + 42);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const time = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map(
    (item) => String(item).padStart(2, "0"),
  );
  return (
    <>
      <section className="mx-auto max-w-350 px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="grid gap-7 rounded-[28px] bg-[#111827] p-7 text-white lg:grid-cols-[1.15fr_1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#A7F3D0]">
              Trending this week
            </p>
            <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-4xl">
              A little more personality for your everyday.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-300">
              Practical gear with unexpected charm, selected by people who genuinely like using it.
            </p>
            <Link
              href="/shop?sort=rating"
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#111827]"
            >
              Explore the trend <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddCart={onAddCart}
                compact
                headingLevel="h3"
              />
            ))}
          </div>
        </div>
      </section>
      <section id="deals" className="bg-[#F5F7F6] py-20 lg:py-28">
        <div className="mx-auto max-w-350 px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7C3AED]">
                On the clock
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-4xl">
                Flash finds, fast.
              </h2>
            </div>
            <div className="flex gap-2" aria-label={`Sale ends in ${time.join(":")}`}>
              {time.map((item, index) => (
                <Fragment key={index}>
                  <div className="rounded-xl bg-white px-3 py-2 font-mono text-xl font-bold text-[#111827] shadow-sm">
                    {item}
                  </div>
                  {index < 2 && <span className="self-center font-bold text-slate-400">:</span>}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {dealProducts.map((product) => {
              const sold = dealProgress[product.slug];

              return (
                <div key={product.id} className="flex flex-col gap-3">
                  <ProductCard
                    product={product}
                    favorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onAddCart={onAddCart}
                    headingLevel="h3"
                  />
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div className="mb-2 flex justify-between text-xs text-slate-500">
                    <span>Claimed fast</span>
                    <span>{sold}% sold</span>
                  </div>
                    <Progress value={sold} aria-label={`${sold}% of ${product.name} claimed`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="collections" className="mx-auto max-w-350 px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#16A34A]">
              A better starting point
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-4xl">
              Shop by feeling.
            </h2>
          </div>
          <a
            className="hidden text-sm font-semibold text-slate-600 hover:text-[#111827] md:block"
            href="#collections"
          >
            See all collections <ChevronRight className="inline h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Collection
            title="The gaming room"
            subtitle="Light up your next level"
            icon={Gamepad2}
            tone="bg-[#7C3AED]"
            text="text-white"
          />
          <Collection
            title="Your home office"
            subtitle="Soft focus, hard work"
            icon={Laptop}
            tone="bg-[#BFDBFE]"
            text="text-[#142d50]"
          />
          <Collection
            title="Audio, everywhere"
            subtitle="Listen a little closer"
            icon={Headphones}
            tone="bg-[#FED7AA]"
            text="text-[#422e1f]"
          />
          <Collection
            title="Smarter at home"
            subtitle="Small upgrades, big ease"
            icon={Sparkles}
            tone="bg-[#D1FAE5]"
            text="text-[#15432b]"
          />
        </div>
      </section>
      <section id="about" className="bg-[#F5F7F6] py-20 lg:py-28">
        <div className="mx-auto max-w-350 px-5 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#16A34A]">
              Why Orbital
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-4xl">
              Easy does it.
            </h2>
            <p className="mt-4 text-slate-600">
              The good stuff around shopping, without the extra stuff.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Truck,
                title: "Free shipping",
                copy: "On orders over $75, always.",
              },
              {
                icon: ShieldCheck,
                title: "Secure payments",
                copy: "Protected at every checkout.",
              },
              {
                icon: PackageCheck,
                title: "Fast dispatch",
                copy: "Out the door within 24 hours.",
              },
              {
                icon: RotateCcw,
                title: "Easy returns",
                copy: "30 days to make it right.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-[22px] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.04)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#D1FAE5] text-[#16803d]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-[#111827]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-350 px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7C3AED]">
              Good words
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-4xl">
              Loved in real life.
            </h2>
          </div>
          <div className="flex gap-1 text-[#f59e0b]" aria-label="Five star rating">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            {
              initials: "KM",
              name: "Kai M.",
              color: "bg-[#D1FAE5] text-[#16803d]",
              quote:
                "Everything feels considered — even the packaging made my Monday a little better.",
            },
            {
              initials: "AR",
              name: "Avery R.",
              color: "bg-[#EDE9FE] text-[#6d28d9]",
              quote:
                "Found the exact desk setup pieces I’d been looking for, without going down a rabbit hole.",
            },
            {
              initials: "SJ",
              name: "Sloane J.",
              color: "bg-[#FED7AA] text-[#b45309]",
              quote: "Fast, effortless, and the product cards actually tell you what matters.",
            },
          ].map((review) => (
            <article
              key={review.name}
              className="rounded-[22px] border border-slate-100 bg-white p-7 shadow-[0_8px_25px_rgba(15,23,42,0.04)]"
            >
              <div className="flex gap-1 text-[#f59e0b]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <blockquote className="mt-5 text-lg leading-8 tracking-tight text-[#111827]">
                “{review.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${review.color}`}
                >
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{review.name}</p>
                  <p className="text-xs text-slate-500">Verified shopper</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-350 px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[28px] bg-[#7C3AED] px-7 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-[#A855F7] opacity-80" />
          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#22C55E] opacity-40 blur-2xl" />
          <div className="relative max-w-xl">
            <BadgeCheck className="h-8 w-8 text-[#D1FAE5]" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
              New tech, less noise.
            </h2>
            <p className="mt-4 text-lg leading-7 text-violet-100">
              A useful email when there’s actually something worth hearing about.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-8 flex max-w-md gap-3 rounded-full bg-white p-1.5 shadow-xl"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <Input
                id="newsletter-email"
                value={email}
                onChange={(event: { target: { value: React.SetStateAction<string> } }) => {
                  setEmail(event.target.value);
                  setSent(false);
                }}
                type="email"
                required
                placeholder="Your email address"
                className="h-11 flex-1 border-0 bg-transparent text-[#111827] shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="h-11 rounded-full bg-[#111827] px-5 text-white hover:bg-[#16A34A]"
              >
                {sent ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    You&apos;re in
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            {sent && (
              <p className="mt-3 text-sm text-[#D1FAE5]" role="status">
                Thanks — your inbox is on the list.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
type CollectionProps = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tone: string;
  text: string;
};
function Collection({ title, subtitle, icon: Icon, tone, text }: CollectionProps) {
  return (
    <motion.a
      whileHover={{
        y: -4,
      }}
      href="#shop"
      className={`group relative min-h-62.5 overflow-hidden rounded-3xl p-7 ${tone} ${text}`}
    >
      <p className="text-sm font-medium opacity-75">{subtitle}</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      <span className="mt-7 inline-flex items-center text-sm font-semibold">
        Shop collection{" "}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
      <Icon className="absolute -bottom-7 -right-6 h-44 w-44 opacity-25" strokeWidth={1.1} />
    </motion.a>
  );
}
