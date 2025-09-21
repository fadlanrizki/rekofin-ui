import { z } from "zod";

export const AddManageUserSchema = z
  .object({
    fullName: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.email("Invalid Email").min(1, "Required"),
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
    role: z.string().nonempty("Required"),
    gender: z.string().optional(),
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

export type AddManageUserForm = z.infer<typeof AddManageUserSchema>;

export const EditManageUserSchema = z
  .object({
    fullName: z.string().optional(),
    username: z.string().optional(),
    email: z.email("Invalid Email").optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    role: z.string().optional(),
    gender: z.string().optional(),
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

export type EditManageUserForm = z.infer<typeof EditManageUserSchema>;

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
