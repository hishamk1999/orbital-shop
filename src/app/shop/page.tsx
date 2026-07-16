import type { Metadata } from "next";

import { ShopPage } from "@/features/products";

export const metadata: Metadata = {
  title: "Shop thoughtful technology | Orbital",
  description: "Browse Orbital's curated electronics for sound, work, home, and play.",
  alternates: { canonical: "/shop" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <ShopPage searchParams={searchParams} />;
}
