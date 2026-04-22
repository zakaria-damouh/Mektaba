import { axiosClient } from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosClient.post(ENDPOINTS.AUTH.LOGIN, data);
  return res.data;
};