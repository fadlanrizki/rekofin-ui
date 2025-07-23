export const API_ROUTE = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register'
    },
    USER: {
        ADD:"/add",
        EDIT: "/user/edit",
        DELETE: "/user/delete"
    },
    FINANCIAL: {
        ADD: "/financial/add",
    },
    RECOMMENDATION: {
        LIST: "/recommendation/list",
        ADD: "/recommendation/add",
        EDIT: "/recommendation/edit",
        DELETE: "/recommendation/${id}",
    },
    

    RULE: {
        LIST: "/rule/list",
        ADD: "/rule/add",
        EDIT: "/rule/edit"
    }

}