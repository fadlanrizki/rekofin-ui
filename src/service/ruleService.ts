import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";
import { ParamsUser } from "@/types/user";

const create = async (data: any): Promise<any> => {
  return await apiClient.post(API_ROUTE.RULE, data);
};

const getList = async (params: ParamsUser): Promise<any> => {
  return await apiClient.get(API_ROUTE.RULE, params);
};

const deleteData = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.RULE}${id}`;
  return await apiClient.delete(url);
};

const findById = async (id: string): Promise<any> => {
  const url = `${API_ROUTE.RULE}${id}`;
  return await apiClient.get(url);
};

const update = async (data: any): Promise<any> => {
  return await apiClient.patch(API_ROUTE.RULE, data);
};

export const RuleService = {
  create,
  getList,
  deleteData,
  findById,
  update,
};
