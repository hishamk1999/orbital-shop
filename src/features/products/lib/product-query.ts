import {
  productCategories,
  type ProductCategory,
  type ProductQuery,
  type ProductSort,
  type ShopSearchParams,
} from "../types/product.types";

const sortOptions: ProductSort[] = ["featured", "newest", "rating", "price-asc", "price-desc"];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePrice(value: string | undefined) {
  if (!value?.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(2000, Math.max(0, parsed)) : undefined;
}

export function normalizeProductQuery(params: ShopSearchParams): ProductQuery {
  const rawCategories = Array.isArray(params.category)
    ? params.category
    : params.category
      ? [params.category]
      : [];
  const categories = rawCategories.filter((category): category is ProductCategory =>
    productCategories.includes(category as ProductCategory),
  );
  const rawSort = first(params.sort);
  const sort = sortOptions.includes(rawSort as ProductSort) ? (rawSort as ProductSort) : "featured";
  const rawPage = Number(first(params.page));
  let minPrice = parsePrice(first(params.minPrice));
  let maxPrice = parsePrice(first(params.maxPrice));

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return {
    q: first(params.q)?.trim().slice(0, 100) ?? "",
    categories: [...new Set(categories)],
    minPrice,
    maxPrice,
    sort,
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: 12,
  };
}

export function queryToSearchParams(query: ProductQuery, overrides: Partial<ProductQuery> = {}) {
  const value = { ...query, ...overrides };
  const params = new URLSearchParams();
  if (value.q) params.set("q", value.q);
  value.categories.forEach((category) => params.append("category", category));
  if (value.minPrice !== undefined) params.set("minPrice", String(value.minPrice));
  if (value.maxPrice !== undefined) params.set("maxPrice", String(value.maxPrice));
  if (value.sort !== "featured") params.set("sort", value.sort);
  if (value.page > 1) params.set("page", String(value.page));
  return params;
}

export const categoryLabels: Record<ProductCategory, string> = {
  audio: "Audio",
  workspace: "Workspace",
  wearables: "Wearables",
  cameras: "Cameras",
  gaming: "Gaming",
  "smart-home": "Smart home",
  mobile: "Mobile",
  charging: "Charging",
};
