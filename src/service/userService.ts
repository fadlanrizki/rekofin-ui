import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";
import { ManageUserForm, ParamsUser } from "@/types/user";

export const createUser = async (data: ManageUserForm): Promise<any> => {
  return await apiClient.post(API_ROUTE.USER, data);
};

export const getUsers = async (params: ParamsUser): Promise<any> => {
  return await apiClient.get(API_ROUTE.USER, params);
};
