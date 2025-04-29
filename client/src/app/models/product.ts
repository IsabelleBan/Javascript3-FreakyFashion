export interface Product {
  id?: number;
  name: string;
  price: string;
  brand: string;
  slug?: string;
  image: string;
  isNew?: number;
  isFavorite?: number;
  description: string;
  sku: string;
}
