import { catalog } from "../data/catalog";
import { categoryLabels } from "../lib/product-query";
import {
  productCategories,
  type PaginatedProducts,
  type Product,
  type ProductQuery,
} from "../types/product.types";

function sortProducts(products: Product[], sort: ProductQuery["sort"]) {
  return [...products].sort((a, b) => {
    if (sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.featuredRank - b.featuredRank;
  });
}

export async function getProducts(query: ProductQuery): Promise<PaginatedProducts> {
  await Promise.resolve();
  const search = query.q.toLocaleLowerCase();
  const filtered = catalog.filter((product) => {
    const matchesSearch =
      !search ||
      [product.name, product.description, categoryLabels[product.category]].some((value) =>
        value.toLocaleLowerCase().includes(search),
      );
    const matchesCategory = !query.categories.length || query.categories.includes(product.category);
    const matchesMin = query.minPrice === undefined || product.price >= query.minPrice;
    const matchesMax = query.maxPrice === undefined || product.price <= query.maxPrice;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });
  const sorted = sortProducts(filtered, query.sort);
  const totalPages = Math.ceil(sorted.length / query.pageSize);
  const page = totalPages ? Math.min(query.page, totalPages) : 1;
  const start = (page - 1) * query.pageSize;

  return {
    products: sorted.slice(start, start + query.pageSize),
    total: sorted.length,
    page,
    pageSize: query.pageSize,
    totalPages,
    categoryCounts: productCategories.map((category) => ({
      category,
      count: catalog.filter((product) => product.category === category).length,
    })),
  };
}
