import { z } from "zod";

export const BaseManageUserSchema = z
  .object({
    fullName: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.email("Invalid Email").min(1, "Required"),
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
    role: z.string().nonempty("Required"),
    gender: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const EditManageUserSchema = BaseManageUserSchema.partial()
  .extend({
    id: z.number(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });
export type FilterUser = {
  role: "all" | "admin" | "employee";
};

export type ParamsUser = {
  search: string;
  filter: FilterUser;
  limit: number;
  page: number;
};

export type TListUser = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
};
