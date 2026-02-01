const userPrefix = "/user";
const adminPrefix = "/admin";

export const ROUTE_PATHS = {
  USER: {
    DASHBOARD: `${userPrefix}/dashboard`,
    PROFILE: `${userPrefix}/profile`,
    CONSULTATION: {
      BASE: `${userPrefix}/consultation`,
      QUESTION: `${userPrefix}/consultation/question`,
      RESULT: `${userPrefix}/consultation/result`,
    },
    HISTORY: `${userPrefix}/history`,
  },
  ADMIN: {
    DASHBOARD: `${adminPrefix}/dashboard`,
    MANAGE_RULE: {
      LIST: `${adminPrefix}/manage-rule`,
      ADD: `${adminPrefix}/manage-rule/form/add`,
      EDIT: `${adminPrefix}/manage-rule/form/edit`,
      VIEW: `${adminPrefix}/manage-rule/form/view`,
    },
    MANAGE_USER: {
      LIST: `${adminPrefix}/manage-user`,
      ADD: `${adminPrefix}/manage-user/form/add`,
      EDIT: `${adminPrefix}/manage-user/form/edit`,
      VIEW: `${adminPrefix}/manage-user/form/view`,
    },
    MANAGE_RECOMMENDATION: {
      LIST: `${adminPrefix}/manage-recommendation`,
      ADD: `${adminPrefix}/manage-recommendation/form/add`,
      EDIT: `${adminPrefix}/manage-recommendation/form/edit`,
      VIEW: `${adminPrefix}/manage-recommendation/form/view`,
    },
    MANAGE_FACT: {
      LIST: `${adminPrefix}/manage-fact`,
      ADD: `${adminPrefix}/manage-fact/form/add`,
      EDIT: `${adminPrefix}/manage-fact/form/edit`,
      VIEW: `${adminPrefix}/manage-fact/form/view`,
    },
    MANAGE_CONCLUSION: {
      LIST: `${adminPrefix}/manage-conclusion`,
      ADD: `${adminPrefix}/manage-conclusion/form/add`,
      EDIT: `${adminPrefix}/manage-conclusion/form/edit`,
      VIEW: `${adminPrefix}/manage-conclusion/form/view`,
    },
    MANAGE_SOURCE: {
      LIST: `${adminPrefix}/manage-source`,
      ADD: `${adminPrefix}/manage-source/form/add`,
      EDIT: `${adminPrefix}/manage-source/form/edit`,
      VIEW: `${adminPrefix}/manage-source/form/view`,
    },
  },
  LOGIN: "/login",
  REGISTER: "/register",
  LANDING_PAGE: "/",
};
