import { Category } from "./category";

export interface Product {
  id: string | number;
  name: string;
  cover: string;
  categories: Category[];
  sku: Sku;
  slug: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  summary: string | null;
  categoryIds: number[] | null;
}

export interface Sku {
  id: number;
  sku: string;
  price: number;
  quantity: number;
  discount: number;
  discountType: string;
}

export interface attributes {
  id: number;
  name: string;
  value: string;
  image: string;
  images: string[];
  quantity: number;
  priceChange: number;
}

export interface ProductSlug {
  id: number;
  name: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cover: string;
  images: string[] | null;
  rating: number | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  sku: {
    id: number;
    sku: string;
    price: number;
    quantity: number;
    isOutOfStock: boolean;
    discount: string;
    discountType: string;
  };
  attributes: Array<{
    id: number;
    name: string;
    value: string;
    image: string;
    images: string[];
    priceChange: number;
    quantity: number;
    isActive: boolean;
  }>;
}

export interface productBySlug {
  data: {
    product: ProductSlug;
    relatedProducts: Product[];
  };
}