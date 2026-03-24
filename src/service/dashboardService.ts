import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";

const getAdminDashboardData = async (): Promise<any> => {
  return await apiClient.get(API_ROUTE.DASHBOARD.ADMIN);
};

const getUserDashboardData = async (): Promise<any> => {
  return await apiClient.get(API_ROUTE.DASHBOARD.USER);
};

export const DashboardService = {
  getAdminDashboardData,
  getUserDashboardData,
};
