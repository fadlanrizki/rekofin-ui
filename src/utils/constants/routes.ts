const userPrefix = "/user";
const adminPrefix = "/admin";

export const ROUTE_PATHS = {
  USER: {
    DASHBOARD: `${userPrefix}/dashboard`,
    PROFILE: `${userPrefix}/profile`,
    FINANCE: `${userPrefix}/finance`,
    RECOMMENDATION: `${userPrefix}/recommendation`,
    HISTORY: `${userPrefix}/history`,
  },
  ADMIN: {
    DASHBOARD: `${adminPrefix}/dashboard`,
    MANAGE_RULE: `${adminPrefix}/manage-rule`,
    MANAGE_USER: `${adminPrefix}/manage-user`,
  },
  LOGIN: "/login",
  REGISTER: "/register",
  LANDING_PAGE: "/",
};
