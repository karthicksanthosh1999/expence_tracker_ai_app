import {z } from 'zod';

export const expenceSchemaValidator = z.object({
    amount: z.coerce.number().min(1, "Amount must be a positive number"),
    bankType: z.string().min(1, "Bank type is required"),
    category: z.string().min(1, "Category is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
    subject: z.string().min(3, "Subject must be greater then 3 character"),
})

export type expenceSchemaValidator = z.infer<typeof expenceSchemaValidator>