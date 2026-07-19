"use client";

import { useState } from "react";

import { Footer, Header } from "@/shared/layouts";
import { CommerceSections } from "../components/CommerceSections";
import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";

export function HomePage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);

  function toggleFavorite(productId: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((favoriteId) => favoriteId !== productId)
        : [...currentFavorites, productId],
    );
  }

  function addToCart() {
    setCartCount((currentCount) => currentCount + 1);
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] font-heading text-[#111827]">
      <Header />
      <main>
        <Hero />
        <ProductGrid
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddCart={addToCart}
        />
        <CommerceSections
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddCart={addToCart}
        />
      </main>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {cartCount > 0
          ? `Cart contains ${cartCount} ${cartCount === 1 ? "item" : "items"}.`
          : ""}
      </p>
      <Footer />
    </div>
  );
}
