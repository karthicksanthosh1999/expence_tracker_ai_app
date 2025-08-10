import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(1, "Title is required!"),
  categoryType: z.string().min(1, "Category type is required!"),
});

export type categorySchema = z.infer<typeof categorySchema>;
