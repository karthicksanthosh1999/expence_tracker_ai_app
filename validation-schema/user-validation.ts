import { z } from "zod";

export const userValidationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  mobile: z.string().min(1, { message: "Mobile is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  image: z.string().optional(),
});

export const loginValidationSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});
