import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";

const create = async (data: any): Promise<any> => {
  return await apiClient.post(API_ROUTE.FINANCIAL, data);
};

export const FinancialService = {
  create,
  
};
