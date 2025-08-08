import { PRISMA } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"


export const GET = async(req:NextRequest,{params} : { params: {id:  string} }) => {
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.findUnique({
            where: { id: params?.id },
            include: {bankData: true, categoryData: true, user:true }
        });
        if(!upcomming_Expences){
            return NextResponse.json({
                message : "Upcomming exepnces not found",
            }, { status: 404})
        }
        return NextResponse.json({
            message : "Upcomming expences fetch successfully",
            response : upcomming_Expences}, { status: 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error
        },{status: 400})
    }
};

export const DELETE = async(req:NextRequest,  { params }: { params: {id:  string}}) => {
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.delete({
            where: {id : params.id},
            include: {bankData: true, categoryData: true, user:true }
        })
        if(!upcomming_Expences){
            return NextResponse.json({
                message : "Expences not found",
            }, { status:404 })
        }
        return NextResponse.json({
            message : "Expences deleted successfully",
            response : upcomming_Expences
        }, { status:200 })
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error: error instanceof Error ? error.message : String(error)
        }, { status:500 })
    }
}

export const PUT = async(req:NextRequest, {params} : { params: {id: string}}) => {
    const { amount, category, subject, userId, bankType, paymentDate, status } = await req.json()
    try {
        const upcomming_Expences = await PRISMA.upcomming_Expences.update({
            where: {id : params.id},
            data: { amount, category, subject, userId, bankType, paymentDate, status }
        })
        return NextResponse.json({
            message : "Upcomming exepnces fetch successfully",
            respones : upcomming_Expences
        },{ status: 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error : error instanceof Error ? error?.message : String(error) ,
        }, {status:500})
    }
}