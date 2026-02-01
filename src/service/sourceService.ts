import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";

const create = async (data: any): Promise<any> => {
  return await apiClient.post(API_ROUTE.SOURCE, data);
};

const getList = async (params: any): Promise<any> => {
  return await apiClient.get(API_ROUTE.SOURCE, params);
};

const deleteData = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.SOURCE}/${id}`;
  return await apiClient.delete(url);
};

const findById = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.SOURCE}/${id}`;
  return await apiClient.get(url);
};

const update = async (data: any): Promise<any> => {
  return await apiClient.put(API_ROUTE.SOURCE, data);
};

export const SourceService = {
  create,
  getList,
  deleteData,
  findById,
  update,
};
