import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { startOfMonth, startOfNextMonth } from "@/utils/dateUtils";
import { ApiCustomError } from "@/utils/apiCutomError";

const PRISMA = new PrismaClient();


export const POST = async(req:NextRequest, res:NextResponse) => {
    const { userId, limit, title } = await req.json();
    try {
        const budget = await PRISMA.budget.create({
            data: { userId, limit, title },
            include: {category:true, user:true}
        })
        return NextResponse.json({
            message: "Budget created successfully",
            status: 201,
            response: budget
        })
    } catch (error) {  
        return NextResponse.json({
            message : "Intternal server error",
            status: 500,
            error
        })
    }
}

export const GET = async(req:NextRequest, res:NextResponse) => {
    try {
        const budget = await PRISMA.budget.findMany({
            include: { category: true }
        });
        return NextResponse.json({
            message : "Budget get successfully",
            budget
        },{status: 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
            error : error instanceof Error ? error.message : String(error)
        }, { status: 500})
    }
}