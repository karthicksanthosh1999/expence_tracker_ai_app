import { PRISMA } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, res:NextResponse) => {
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.findMany({  include: {bankData: true, categoryData: true, user:true }});
        return NextResponse.json({
            message : "Expences get successfully",
            response : upcomming_Expences
        },{status: 200})
    } catch (error) { 
        return NextResponse.json({
            message :"Internal server failed",
            error: error instanceof Error ? error.message : String(error)
        },{status: 500})
    }
}

export const POST = async(req:NextRequest, res:NextResponse) => {
    const { amount, category, subject, userId, bankType, paymentDate, status } = await req.json()
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.create({
            data: {amount, category, subject, status, userId, bankType, paymentDate : new Date(paymentDate).toISOString()}
        })
        return NextResponse.json({
            message : "Upcomming expences created successfully",
            response : upcomming_Expences
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500})
    }
}