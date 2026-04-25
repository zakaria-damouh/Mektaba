import { axiosClient } from "@/lib/api/axiosClient";


export const getCategories = async (search?: string) => {
  const params = {
    ...(search && { search }),
  }
  console.log("Fetching categories with params:", params); // Debug log
  const res = await axiosClient.get("/categories", {params});
  return res.data;
}