export { getProducts } from "./api/get-products";
export { getProduct, getProductSlugs } from "./api/get-product";
export { ProductCard } from "./components/ProductCard";
export { ShopErrorState, ShopLoading } from "./components/ShopStates";
export { catalog } from "./data/catalog";
export { ProductDetailsPage } from "./pages/ProductDetailsPage";
export { ShopPage } from "./pages/ShopPage";
export type {
  PaginatedProducts,
  Product,
  ProductCategory,
  ProductDetails,
  ProductQuery,
} from "./types/product.types";
