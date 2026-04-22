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
  categories: {
    category: {
      name: string;
      nameAr: string;
    };
  }[];
};

