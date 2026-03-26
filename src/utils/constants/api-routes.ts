const apiUserPrefix = "/api/user";
const apiAdminPrefix = "/api/admin";

export const API_ROUTE = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  ADMIN_USER: apiAdminPrefix + "/users",
  USER: apiUserPrefix,
  RECOMMENDATION: apiAdminPrefix + "/recommendations",
  FACT: apiAdminPrefix + "/facts",
  CONCLUSION: apiAdminPrefix + "/conclusions",
  RULE: apiAdminPrefix + "/rules",
  SOURCE: apiAdminPrefix + "/sources",
  CONSULTATION: apiUserPrefix + "/consultations",
  DASHBOARD: {
    ADMIN: apiAdminPrefix + "/dashboard",
    USER: apiUserPrefix + "/dashboard",
  },
};
