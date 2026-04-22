import { axiosClient } from "@/lib/api/axiosClient";

export const getProducts = async () => {
  const res = await axiosClient.get("/products");
  return res.data.data;
};