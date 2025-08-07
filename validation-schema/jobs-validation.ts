import { z } from 'zod';

export const jobValidation = z.object({
    title: z.string().min(1, "Title is required!"),
    jobType: z.string().min(1, "Job type is required"),
    qualification: z.string().min(1, "Qualification is required"),
    salaryRange: z.string().min(1, " Responsibilities is required"),
    experience: z.string().min(1, "Experience is required"),
    responsibilities: z.any(),
    requiredSkills: z.any()
})