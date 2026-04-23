import { axiosClient } from "@/lib/api/axiosClient";


export const getCategories = async () => {
  const res = await axiosClient.get("/categories");
  return res.data;
}