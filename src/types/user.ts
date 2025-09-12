import { z } from "zod";

export const ManageUserSchema = z
  .object({
    fullName: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
    role: z.string().nonempty("Required"),
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

export type ManageUserForm = z.infer<typeof ManageUserSchema>;

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
