import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";
import { ParamsUser } from "@/types/user";

const createUser = async (data: any): Promise<any> => {
  return await apiClient.post(API_ROUTE.USER, data);
};

const getUsers = async (params: ParamsUser): Promise<any> => {
  return await apiClient.get(API_ROUTE.USER, params);
};

const deleteUser = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.USER}${id}`;
  return await apiClient.delete(url);
};

const findUserById = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.USER}${id}`;
  return await apiClient.get(url);
};

const updateUser = async (data: any): Promise<any> => {
  return await apiClient.patch(API_ROUTE.USER, data);
};

export const UserService = {
  createUser,
  getUsers,
  deleteUser,
  findUserById,
  updateUser,
};
