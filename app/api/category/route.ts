import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const PRISMA = new PrismaClient();

export const POST = async(req:NextRequest, res:NextResponse) => {
    const { title, userId } = await req.json()
    try {
        const category = await PRISMA.category.create({
            data: {title, userId},
            include: { user: true }
        })
        return NextResponse.json({
            message : "Category Created Successfully",
            status: 201,
            response : category
        })
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
            status: 500,
            error
        })
    }
}

export const GET = async(req:NextRequest, res:NextResponse) => {
    try {
        const salary = await PRISMA.category.findMany();
        return NextResponse.json({
            message : "Category Fetch SUccessfully",
            status: 201,
            response : salary
        })
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500,
            error
        })
    }
}