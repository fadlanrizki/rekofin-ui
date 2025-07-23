import { API_ROUTE } from "@/utils/constants/api-routes"
import { apiClient } from "./apiService";

export const loginService = async(data: UserLoginRequestType): Promise<UserLoginResponseType> => {
    const res: UserLoginResponseType = await apiClient.post(API_ROUTE.AUTH.LOGIN, data);
    return res;
}

export const registerService = async(data: UserRegisterRequestType): Promise<UserRegisterResponseType> => {
    const res: UserRegisterResponseType = await apiClient.post(API_ROUTE.AUTH.REGISTER, data);
    return res;
}