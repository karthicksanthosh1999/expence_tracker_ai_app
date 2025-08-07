import {z} from 'zod';


export const budgetValidationSchema = z.object({
    title : z.string().min(3, "Title is required!"),
    limit : z.coerce.number().min(1, "Amount must be positive number!")
})

export type budgetValidationSchema = z.infer<typeof budgetValidationSchema>