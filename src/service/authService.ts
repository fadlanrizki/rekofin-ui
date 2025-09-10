import { API_ROUTE } from "@/utils/constants/api-routes"
import { apiClient } from "./apiService";
import { UserLoginResponseType, UserRegisterResponseType } from "@/types/user";
import { TLogin, TRegister } from "@/types/auth";

export const loginService = async(data: TLogin): Promise<UserLoginResponseType> => {
    const res: UserLoginResponseType = await apiClient.post(API_ROUTE.AUTH.LOGIN, data);
    return res;
}

export const registerService = async(data: TRegister): Promise<UserRegisterResponseType> => {
    const res: UserRegisterResponseType = await apiClient.post(API_ROUTE.AUTH.REGISTER, data);
    return res;
}