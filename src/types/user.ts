import { z } from "zod";

export type UserLoginRequestType = {
  credential: string;
  password: string;
};

export type UserLoginResponseType = {
  data: {
    token?: string;
  };
  message?: string;
};

export type UserRegisterRequestType = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

export type UserRegisterResponseType = {
  data: {
    fullName: string;
    username: string;
  };
  message: string;
};

export const ManageUserSchema = z.object({
  fullName: z.string().min(1, "Required"),
  username: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
  role: z.string().nonempty("Required"),
  status: z.string().min(1, "Required"),
});

export type ManageUserForm = z.infer<typeof ManageUserSchema>;
