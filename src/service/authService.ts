import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";
import { TLogin, TRegister } from "@/types/auth";

export const loginService = async (data: TLogin): Promise<any> => {
  return await apiClient.post(API_ROUTE.AUTH.LOGIN, data);
  //   return await apiService(API_ROUTE.AUTH.LOGIN, "POST", data);
};

export const registerService = async (data: TRegister): Promise<any> => {
  return await apiClient.post(API_ROUTE.AUTH.REGISTER, data);
};
