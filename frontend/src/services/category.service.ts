import { axiosClient } from "@/lib/api/axiosClient";


export const getCategories = async (search?: string) => {
  const params = {
    ...(search && { search }),
  }
  const res = await axiosClient.get("/categories", {params});
  return res.data;
}

export const postCategory = async (data: {name: string, nameAr: string}) => {
  const res = await axiosClient.post("/categories", data);
  return res.data;
}