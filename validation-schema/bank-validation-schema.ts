import { z } from "zod";

export const bankSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  accountNo: z.string().min(1, "AccountNo is required!"),
  ifcode: z.string().min(1, "ifcode is required!"),
  location: z.string().min(1, "location is required!"),
});

export type bankSchema = z.infer<typeof bankSchema>;
