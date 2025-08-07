import { routeHandlerFunction } from "@/lib/error-handler";
import { formatResponse } from "@/lib/response";
import { jobValidation } from "@/validation-schema/jobs-validation";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

export const POST = async (req: NextRequest) => {
    try {
        const form = await req.formData();

        const data: Record<string, any> = {};
        form.forEach((value, key) => {
            data[key] = value;
        });

        const validatedJobs = jobValidation.parse(data);

        const job = await PRISMA.jobs.create({
            data: validatedJobs,
        });

        return formatResponse(job, 'Job Created Successfully', 201);
    } catch (error) {
        return routeHandlerFunction(error);
    }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const jobs = await PRISMA.jobs.findMany()
        return formatResponse(jobs, "Jobs fetched successfully", 200)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}