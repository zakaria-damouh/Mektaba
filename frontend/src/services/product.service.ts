import { axiosClient } from "@/lib/api/axiosClient";

export const getProducts = async (categoryIds?: number[] , search?: string, stock?: string , sortBy?: string) => {
  const params = {
    categoryIds: categoryIds?.length ? categoryIds.join(",") : undefined,
    search,
    stock,
    sortBy
  };
  const res = await axiosClient.get("/products", { params });
  return res.data.data;
};