const apiUserPrefix = "/api/user";
const apiAdminPrefix = "/api/admin";

export const API_ROUTE = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USER: apiAdminPrefix + "/users",
  RECOMMENDATION: apiAdminPrefix + "/recommendations",
  FACT: apiAdminPrefix + "/facts",
  CONCLUSION: apiAdminPrefix + "/conclusions",
  RULE: apiAdminPrefix + "/rules",
  CONSULTATION: apiUserPrefix + "/consultations",
};
