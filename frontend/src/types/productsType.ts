import { ProductCategory } from "./categoriesType";

export type Product = {
  id: number;
  ref: string;
  name: string;
  nameAr: string;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
  lastRestocked: string;
  categories: ProductCategory[];
};

