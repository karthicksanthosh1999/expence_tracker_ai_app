import { routeHandlerFunction } from "@/lib/error-handler";
import { PrismaClient } from "@/lib/generated/prisma";
import { errorFormatResponse, formatResponse } from "@/lib/response";
import { jobValidation } from "@/validation-schema/jobs-validation";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient()

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const job = await PRISMA.jobs.findUnique({
            where: {
                id: params.id
            }
        })
        if (!job) return errorFormatResponse("Jobs not found", 404);
        return formatResponse(job, "Job fetch successfully", 200)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const form = await req.formData();
        const data: Record<string, any> = {};

        form.forEach((value, key) => {
            data[key] = value
        })

        const job = await PRISMA.jobs.findUnique({
            where: {
                id: params.id
            }
        });
        if (!job) return errorFormatResponse("Job not found", 404)
        const validatedJobs = jobValidation.parse(data);
        const updatedJob = await PRISMA.jobs.update({
            where: {
                id: params.id
            },
            data: validatedJobs
        })

        return formatResponse(updatedJob, "Job updated successfully", 200)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const job = await PRISMA.jobs.delete({
            where: {
                id: params?.id
            }
        })
        if (!job) return errorFormatResponse("Jobs Not Found", 404)
        return formatResponse(job, "Job Deleted Successfully", 200)
    } catch (error) {
        routeHandlerFunction(error)
    }
}