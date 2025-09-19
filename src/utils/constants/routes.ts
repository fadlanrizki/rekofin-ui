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
    MANAGE_USER: {
      LIST: `${adminPrefix}/manage-user`,
      ADD: `${adminPrefix}/manage-user/form/add`,
      EDIT: `${adminPrefix}/manage-user/form/edit`,
      VIEW: `${adminPrefix}/manage-user/form/view`,
      
    },
    MANAGE_RECOMMENDATION: {
      LIST: `${adminPrefix}/manage-recommendation`,
      ADD: `${adminPrefix}/manage-recommendation/add`,
    }
  },
  LOGIN: "/login",
  REGISTER: "/register",
  LANDING_PAGE: "/",
};
