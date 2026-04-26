import { axiosClient } from "@/lib/api/axiosClient";


export const getCategories = async (search?: string) => {
  const params = {
    ...(search && { search }),
  }
  const res = await axiosClient.get("/categories", {params});
  return res.data;
}