import { routeHandlerFunction } from '@/lib/error-handler';
import { PrismaClient } from '@/lib/generated/prisma';
import { errorFormatResponse, formatResponse } from '@/lib/response';
import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { userValidationSchema } from '@/validation-schema/user-validation';
import { uploadFileToLocal } from '@/lib/upload-image';
import bcrypt from 'bcrypt'

const PRISMA = new PrismaClient();

export const GET = async (
    _req: NextRequest,
    params: { params: { id: string } }
) => {
    try {
        const userId = params.params?.id;

        if (!userId) {
            return errorFormatResponse("Provide the Id", 400);
        }

        const user = await PRISMA.user.findUnique({
            where: { id: Number(userId) },
        });

        if (!user) {
            return errorFormatResponse("User not found", 404);
        }

        return formatResponse(user, "User fetched successfully", 200);
    } catch (error) {
        return routeHandlerFunction(error);
    }
};

export const DELETE = async (_req: NextRequest, params: { params: { id: string } }) => {
    try {
        const userId = params.params.id
        if (!userId) return errorFormatResponse("Provide the id", 400)
        const existingUser = await PRISMA.user.findUnique({ where: { id: Number(userId) } })
        if (!existingUser) {
            return errorFormatResponse("User not found", 404)
        }
        // DELETE THE OLD IMAGE
        if (existingUser.image) {
            const filePath = path.join(process.cwd(), 'public', existingUser.image)
            try {
                await fs.unlink(filePath);
            } catch (error) {
                console.warn("image delete failed", filePath)
            }
        }
        const user = await PRISMA.user.delete({
            where: { id: Number(userId) }
        })

        return formatResponse(user, "User deleted successfully", 200)
    } catch (error) {
        return routeHandlerFunction(error)
    }
}

export const PUT = async (req: NextRequest, params: { params: { id: string } }) => {
    try {
        const userId = params.params.id
        const formData = await req.formData()

        const newImage = formData.get("image") as File;
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        const existingUser = await PRISMA.user.findUnique({ where: { id: Number(userId) } });

        if (!existingUser) return errorFormatResponse("User not found", 404);
        let newImagePath: string | null = existingUser?.image;
        if (newImage) {
            newImagePath = await uploadFileToLocal(newImage)

            // DELETE OLD IMAGE
            if (existingUser?.image) {
                const pathName = path.join(process.cwd(), 'public', existingUser.image)
                try {
                    await fs.unlink(pathName)
                } catch (error) {
                    console.log("image delete failed", pathName)
                }
            }
        }

        const validatedUser = userValidationSchema.omit({ id: true, image: true }).parse({ name, email, password })
        const hashedPassword = await bcrypt.hash(validatedUser.password, 10)

        const updatedUser = await PRISMA.user.update({
            where: { id: Number(userId) },
            data: { ...validatedUser, image: newImagePath, password: hashedPassword }
        })
        return formatResponse(updatedUser, "User updated successfully", 200)

    } catch (error) {
        return routeHandlerFunction(error)
    }
}