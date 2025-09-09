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
    MANAGE_RULE: {
      LIST: `${adminPrefix}/manage-rule`,
      ADD: `${adminPrefix}/manage-rule/add`
    },
    MANAGE_USER: `${adminPrefix}/manage-user`,
    MANAGE_RECOMMENDATION: {
      LIST: `${adminPrefix}/manage-recommendation`,
      ADD: `${adminPrefix}/manage-recommendation/add`,
    }
  },
  LOGIN: "/login",
  REGISTER: "/register",
  LANDING_PAGE: "/",
};
