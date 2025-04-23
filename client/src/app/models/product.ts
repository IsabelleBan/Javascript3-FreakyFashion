// src/app/models/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  slug: string;
  image: string;
  isNew: number;
  isFavorite: number;
  description: string;
  sku: string;
}
