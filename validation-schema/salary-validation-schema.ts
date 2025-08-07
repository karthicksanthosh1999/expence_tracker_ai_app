import {z} from 'zod';
import { expenceSchemaValidator } from './expence-validation';

export const salarySchemaValidation = z.object({
    bankType : z.string().min(1,"Bank type is required"),
    salaryDate : z.string().min(1, "Salary date is required"),
    amount : z.coerce.number().min(1, "Amount is required")
})

export type salarySchemaValidation = z.infer<typeof expenceSchemaValidator>