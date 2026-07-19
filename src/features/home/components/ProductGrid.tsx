import {
  ArrowRight,
  Camera,
  Gamepad2,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Smartphone,
  Speaker,
  Watch,
} from "lucide-react";
import { Product, ProductCard } from "./ProductCard";

const categories = [
  {
    name: "Laptops",
    icon: Laptop,
  },
  {
    name: "Phones",
    icon: Smartphone,
  },
  {
    name: "Audio",
    icon: Speaker,
  },
  {
    name: "Gaming",
    icon: Gamepad2,
  },
  {
    name: "Smart home",
    icon: Monitor,
  },
  {
    name: "Accessories",
    icon: Mouse,
  },
  {
    name: "Office",
    icon: Keyboard,
  },
  {
    name: "Wearables",
    icon: Watch,
  },
];
const products: Product[] = [
  {
    id: 1,
    name: "Aura Noise Canceling Headphones",
    category: "Audio",
    price: 249,
    oldPrice: 299,
    rating: 4.9,
    icon: Speaker,
    tone: "bg-[#D1FAE5]",
    badge: "Save 17%",
  },
  {
    id: 2,
    name: "Nexus Mechanical Keyboard",
    category: "Desk setup",
    price: 159,
    rating: 4.8,
    icon: Keyboard,
    tone: "bg-[#EDE9FE]",
  },
  {
    id: 3,
    name: "Arc Smartwatch 44mm",
    category: "Wearables",
    price: 279,
    oldPrice: 329,
    rating: 4.7,
    icon: Watch,
    tone: "bg-[#BFDBFE]",
    badge: "New",
  },
  {
    id: 4,
    name: "Halo 4K Pocket Camera",
    category: "Creator gear",
    price: 399,
    rating: 4.9,
    icon: Camera,
    tone: "bg-[#FED7AA]",
  },
];
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
          {categories.map(({ name, icon: Icon }) => (
            <a
              href="#shop"
              key={name}
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-[#22C55E] hover:text-[#16803d]"
            >
              <Icon className="h-4 w-4" />
              {name}
            </a>
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
          <a
            href="#shop"
            className="hidden items-center text-sm font-semibold text-[#111827] hover:text-[#16A34A] sm:flex"
          >
            View all products <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddCart={onAddCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
