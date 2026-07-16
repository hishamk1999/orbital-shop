import { describe, expect, it } from "vitest";

import { getProducts } from "../api/get-products";
import { normalizeProductQuery } from "../lib/product-query";
import type { ProductQuery } from "../types/product.types";

function query(overrides: Partial<ProductQuery> = {}): ProductQuery {
  return { q: "", categories: [], sort: "featured", page: 1, pageSize: 100, ...overrides };
}

describe("product catalog", () => {
  it("searches product names, descriptions, and category labels", async () => {
    const headphones = await getProducts(query({ q: "headphones" }));
    const workspace = await getProducts(query({ q: "workspace" }));

    expect(headphones.products.map((product) => product.name)).toContain(
      "Aura noise-canceling headphones",
    );
    expect(workspace.products.every((product) => product.category === "workspace")).toBe(true);
  });

  it("combines multiple categories with price limits", async () => {
    const result = await getProducts(
      query({ categories: ["audio", "charging"], minPrice: 80, maxPrice: 200 }),
    );

    expect(result.products.length).toBeGreaterThan(0);
    expect(
      result.products.every((product) => ["audio", "charging"].includes(product.category)),
    ).toBe(true);
    expect(result.products.every((product) => product.price >= 80 && product.price <= 200)).toBe(
      true,
    );
  });

  it.each([
    ["price-asc", 49],
    ["price-desc", 749],
  ] as const)("sorts by %s", async (sort, firstPrice) => {
    const result = await getProducts(query({ sort }));
    expect(result.products[0].price).toBe(firstPrice);
  });

  it("sorts newest and rating results", async () => {
    const newest = await getProducts(query({ sort: "newest" }));
    const rating = await getProducts(query({ sort: "rating" }));

    expect(newest.products[0].name).toBe("Orbit phone 128GB");
    expect(rating.products[0].rating).toBe(4.9);
    expect(rating.products[0].reviewCount).toBeGreaterThanOrEqual(rating.products[1].reviewCount);
  });

  it("paginates and clamps pages beyond the result set", async () => {
    const second = await getProducts(query({ page: 2, pageSize: 12 }));
    const beyond = await getProducts(query({ page: 99, pageSize: 12 }));

    expect(second.products).toHaveLength(12);
    expect(second.page).toBe(2);
    expect(beyond.page).toBe(2);
  });

  it("normalizes invalid URL values and reversed prices", () => {
    expect(
      normalizeProductQuery({
        category: ["audio", "unknown"],
        minPrice: "900",
        maxPrice: "100",
        sort: "nope",
        page: "-4",
      }),
    ).toMatchObject({
      categories: ["audio"],
      minPrice: 100,
      maxPrice: 900,
      sort: "featured",
      page: 1,
      pageSize: 12,
    });
  });

  it("returns a useful empty result", async () => {
    const result = await getProducts(query({ q: "definitely-not-a-product" }));
    expect(result).toMatchObject({ products: [], total: 0, totalPages: 0, page: 1 });
  });
});
