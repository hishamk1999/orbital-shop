import React from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  icon: React.ElementType;
  tone: string;
  badge?: string;
};
type ProductCardProps = {
  product: Product;
  favorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddCart: (id: number) => void;
  compact?: boolean;
};
export function ProductCard({
  product,
  favorite,
  onToggleFavorite,
  onAddCart,
  compact = false,
}: ProductCardProps) {
  const Icon = product.icon;
  return (
    <motion.article
      layout
      whileHover={{
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 28,
      }}
      className={`group relative overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_8px_25px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 ${compact ? "flex gap-4 sm:block" : ""}`}
    >
      <div
        className={`relative grid place-items-center overflow-hidden rounded-2xl ${product.tone} ${compact ? "h-32 w-32 shrink-0 sm:h-48 sm:w-full" : "h-52 sm:h-60"}`}
      >
        <span className="absolute -right-6 -top-7 h-28 w-28 rounded-full bg-white/35" />
        <Icon
          className="relative h-24 w-24 text-[#111827] drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.45}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#111827] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => onToggleFavorite(product.id)}
          aria-label={`${favorite ? "Remove" : "Add"} ${product.name} ${favorite ? "from" : "to"} favorites`}
          aria-pressed={favorite}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 shadow-sm transition-colors hover:bg-white ${favorite ? "text-rose-500" : "text-slate-600"}`}
          type="button"
        >
          <Heart className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="min-w-0 px-1 pb-1 pt-4">
        <p className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
          {product.category}
        </p>
        <h3 className="mt-1 truncate text-[15px] font-semibold tracking-tight text-[#111827]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
          {product.rating.toFixed(1)} <span className="text-slate-300">(124)</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-semibold text-[#111827]">${product.price}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-slate-400 line-through">${product.oldPrice}</span>
            )}
          </div>
          <Button
            onClick={() => onAddCart(product.id)}
            size="icon-sm"
            aria-label={`Add ${product.name} to cart`}
            className="rounded-full bg-[#111827] text-white hover:bg-[#16A34A]"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
