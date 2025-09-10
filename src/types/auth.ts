import { z } from "zod"

export const loginSchema = z.object({
  credential: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type TLogin = z.infer<typeof loginSchema>;


export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.email("Invalid email format"),
    password: z.string().min(1, "Required"),
    confirm_password: z.string().min(1, "Required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match",
        path: ["confirm_password"],
      });
    }
  });

export type TRegister = z.infer<typeof registerSchema>;