export const productCategories = [
  "audio",
  "workspace",
  "wearables",
  "cameras",
  "gaming",
  "smart-home",
  "mobile",
  "charging",
] as const;

export type ProductCategory = (typeof productCategories)[number];
export type ProductSort = "featured" | "newest" | "rating" | "price-asc" | "price-desc";
export type ProductVisual =
  | "headphones"
  | "keyboard"
  | "watch"
  | "camera"
  | "controller"
  | "speaker"
  | "phone"
  | "charger"
  | "lamp"
  | "mouse"
  | "display"
  | "buds";
export type ProductTone = "mint" | "sky" | "peach" | "violet" | "rose" | "sand";

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  previousPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  visual: ProductVisual;
  tone: ProductTone;
  createdAt: string;
  featuredRank: number;
};

export type ProductQuery = {
  q: string;
  categories: ProductCategory[];
  minPrice?: number;
  maxPrice?: number;
  sort: ProductSort;
  page: number;
  pageSize: number;
};

export type CategoryCount = {
  category: ProductCategory;
  count: number;
};

export type PaginatedProducts = {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  categoryCounts: CategoryCount[];
};

export type ShopSearchParams = Record<string, string | string[] | undefined>;

export type ProductGalleryItem = {
  id: string;
  label: string;
  tone: ProductTone;
};

export type ProductReview = {
  id: number;
  author: string;
  initials: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
};

export type ProductDetails = {
  product: Product;
  gallery: ProductGalleryItem[];
  colors: Array<{
    name: string;
    value: string;
  }>;
  highlights: string[];
  story: {
    eyebrow: string;
    title: string;
    description: string;
  };
  specifications: Array<{
    label: string;
    value: string;
  }>;
  boxContents: string[];
  reviews: ProductReview[];
};
