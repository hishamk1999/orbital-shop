import { cache } from "react";

import { catalog } from "../data/catalog";
import { createProductDetails } from "../data/product-details";
import type { ProductDetails } from "../types/product.types";

export const getProduct = cache(async (slug: string): Promise<ProductDetails | null> => {
  const product = catalog.find((item) => item.slug === slug);

  return product ? createProductDetails(product) : null;
});

export function getProductSlugs() {
  return catalog.map((product) => product.slug);
}
