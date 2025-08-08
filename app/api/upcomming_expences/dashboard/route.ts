import { PRISMA } from "@/lib/utils";
import { startOfMonth, startOfNextMonth } from "@/utils/dateUtils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, res:NextResponse) => {
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.findMany({
            where: {
                status: "Pending",
                paymentDate: {
                    gte:startOfMonth,
                    lt:startOfNextMonth
                },
            },
            include: {
                categoryData: true,
                bankData: true,
                user: true,
              },
        })
        return NextResponse.json({
            message : "Expences fetch successfully",
            response : upcomming_Expences
        }, { status: 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error: error instanceof Error ? error.message : String(error)
        } , { status: 500 })
    } 
}