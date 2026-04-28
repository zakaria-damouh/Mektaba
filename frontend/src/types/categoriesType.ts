
export type Category = {
  id: number;
  name: string;
  nameAr: string;
  createdAt: string;
  updatedAt: string;
 _count: {
    products: number;
  };
};

export type ProductCategory = {
  id: number;
  productId: number;
  categoryId: number;
  category: Category;
};