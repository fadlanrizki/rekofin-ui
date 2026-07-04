import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";

const createUser = async (data: any): Promise<any> => {
  return await apiClient.post(API_ROUTE.ADMIN_USER, data);
};

const getUsers = async (params: any): Promise<any> => {
  return await apiClient.get(API_ROUTE.ADMIN_USER, params);
};

const changeStatusUser = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.ADMIN_USER}/${id}`;
  return await apiClient.patch(url);
};

const findUserById = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.ADMIN_USER}/${id}`;
  return await apiClient.get(url);
};

const updateUser = async (data: any): Promise<any> => {
  return await apiClient.patch(API_ROUTE.ADMIN_USER, data);
};

const getUserProfile = async (): Promise<any> => {
  const url = `${API_ROUTE.USER}/profile`;
  return await apiClient.get(url);
};

const updateUserProfile = async (data: any): Promise<any> => {
  const url = `${API_ROUTE.USER}/profile`;
  return await apiClient.put(url, data);
};

const changePassword = async (data: any): Promise<any> => {
  const url = `${API_ROUTE.USER}/change_password`;
  return await apiClient.post(url, data);
};

const getAdminProfile = async (): Promise<any> => {
  const url = `${API_ROUTE.ADMIN_USER}/profile`;
  return await apiClient.get(url);
};

const updateAdminProfile = async (data: any): Promise<any> => {
  const url = `${API_ROUTE.ADMIN_USER}/profile`;
  return await apiClient.put(url, data);
};

const changeAdminPassword = async (data: any): Promise<any> => {
  const url = `${API_ROUTE.ADMIN_USER}/change_password`;
  return await apiClient.post(url, data);
};

export const UserService = {
  createUser,
  getUsers,
  changeStatusUser,
  findUserById,
  updateUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
};
