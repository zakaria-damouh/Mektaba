import { axiosClient } from "@/lib/api/axiosClient";

export const getProducts = async (
  categoryIds?: number[],
  search?: string,
  stock?: string,
  sortBy?: string,
  page = 1,
  limit = 20,
) => {
  const params = {
    ...(categoryIds?.length && { categoryIds: categoryIds.join(",") }),
    ...(search && { search }),
    ...(stock && stock !== "all" && { stock }),
    ...(sortBy && { sortBy }),
    page,
    limit,
  };
  const res = await axiosClient.get("/products", { params });
  return res.data;
};


export const getProductById = async (id: number) => {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
}