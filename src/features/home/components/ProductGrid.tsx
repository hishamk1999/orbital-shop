import {
  ArrowRight,
  Gamepad2,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Smartphone,
  Speaker,
  Watch,
} from "lucide-react";
import Link from "next/link";

import { catalog, ProductCard } from "@/features/products";

const categories = [
  {
    name: "Laptops",
    icon: Laptop,
    href: "/shop?category=workspace",
  },
  {
    name: "Phones",
    icon: Smartphone,
    href: "/shop?category=mobile",
  },
  {
    name: "Audio",
    icon: Speaker,
    href: "/shop?category=audio",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/shop?category=gaming",
  },
  {
    name: "Smart home",
    icon: Monitor,
    href: "/shop?category=smart-home",
  },
  {
    name: "Accessories",
    icon: Mouse,
    href: "/shop?category=charging",
  },
  {
    name: "Office",
    icon: Keyboard,
    href: "/shop?category=workspace",
  },
  {
    name: "Wearables",
    icon: Watch,
    href: "/shop?category=wearables",
  },
];

const featuredProducts = catalog.slice(0, 4);
type ProductGridProps = {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddCart: (id: number) => void;
};
export function ProductGrid({ favorites, onToggleFavorite, onAddCart }: ProductGridProps) {
  return (
    <>
      <section
        aria-label="Shop categories"
        className="mx-auto max-w-350 overflow-hidden px-5 pt-12 lg:px-8"
      >
        <div className="flex gap-3 overflow-x-auto pt-3 scrollbar-none">
          {categories.map(({ name, icon: Icon, href }) => (
            <Link
              href={href}
              key={name}
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-[#22C55E] hover:text-[#16803d]"
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}
        </div>
      </section>
      <section id="shop" className="mx-auto max-w-350 px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#16A34A]">
              Made to be used
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#111827] sm:text-4xl">
              Picked for right now.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center text-sm font-semibold text-[#111827] hover:text-[#16A34A] sm:flex"
          >
            View all products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddCart={onAddCart}
              headingLevel="h3"
            />
          ))}
        </div>
      </section>
    </>
  );
}
