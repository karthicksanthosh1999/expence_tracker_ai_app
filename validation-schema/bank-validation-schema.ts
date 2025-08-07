import {z} from 'zod';

export const bankSchema = z.object({
    title : z.string().min(1,"Title is required!")
}) 

export type bankSchema = z.infer<typeof bankSchema>