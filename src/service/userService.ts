import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";
import { ManageUserForm } from "@/types/user";

export const createUser = async (data: ManageUserForm): Promise<any> => {
  return await apiClient.post(API_ROUTE.USER, data);
};
