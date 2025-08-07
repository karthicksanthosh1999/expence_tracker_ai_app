import { routeHandlerFunction } from '@/lib/error-handler';
import { PrismaClient } from '@/lib/generated/prisma';
import { errorFormatResponse, formatResponse } from '@/lib/response';
import { userValidationSchema } from '@/validation-schema/user-validation';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { uploadFileToLocal } from '@/lib/upload-image';

const PRISMA = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const formData = await req.formData()

        const image = formData.get("image") as File;
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const validatedData = userValidationSchema.omit({ id: true, image: true }).parse({ name, email, password });
        const existingUser = await PRISMA.user.findUnique({
            where: {
                email: validatedData.email
            }
        })
        if (!image) return errorFormatResponse("Image is important", 400)
        const imagePath = await uploadFileToLocal(image);
        if (existingUser) return errorFormatResponse("User already exist", 400)
        const hashedPassword = await bcrypt.hash(validatedData.password, 10)
        const user = await PRISMA.user.create({
            data: { ...validatedData, password: hashedPassword, image: imagePath }
        })
        return formatResponse(user, "User Created Successfully", 201)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const usersList = await PRISMA.user.findMany();
        return formatResponse(usersList, "User Fetch Successfully", 200)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}