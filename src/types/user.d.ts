import { StatusOk } from "./response";

export type UserLoginRequestType = {
  username: string;
  password: string;
};

export type UserLoginResponseType = StatusOk & {
  data: {
    username: string;
    fullname: string;
    token?: string;
    role: string;
  };
  message?: string;
};

export type UserRegisterRequestType = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

export type UserRegisterResponseType = StatusOk & {
  data: {
    username: string;
    fullName: string;
  };
  message: string;
};
