import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const PRISMA = new PrismaClient();
// DELETE EXPENCES 
export const DELETE = async(_req:NextRequest, { params }: { params: { id: string } }) => {
    try {
        const expence = await PRISMA.expences.delete({
            where: {
                id : String(params.id)
            }
        })
        if(!expence){
            return NextResponse.json({
                message : "Expence not found",
                status: 404
            })
        }
        return NextResponse.json({
            message : "Expences delete successfully",
            status: 200,
            responses: expence
        })
    } catch (error) {
        return NextResponse.json({
            message : "Can't delete expences",
            status: 500,
            error
        })
    }
}

// GET SINGLE EXPENCES
export const GET = async(_req:NextRequest,{params} : { params: {id : string}}) => {
    try {
        const expence = await PRISMA.expences.findUnique({
            where : {
                id : params.id
            },
            include: {
                user: true
            }
        })
        if(!expence){
            return NextResponse.json({
                message: "Expences not found",
                status : 404
            })
        }
        return NextResponse.json({
            message : "Expences fetch successfully",
            status: 200,
            responses: expence
        })
    } catch (error) {
        return NextResponse.json({
            message: "Expences fetch failds",
            status: 500,
            error: error instanceof Error ? error.message : String(error)
        })
    }
} 

export const PUT = async(req:NextRequest, {params} : { params: {id: string}}) => {
    const { amount, category, subject, userId, bankType, paymentDate } = await req.json()
    try {
        const expence = await PRISMA.expences.update({
            where: {id : params.id},
            data: { amount, category, subject, userId, bankType, paymentDate }
        })
        return NextResponse.json({
            message : "Exepnces fetch successfully",
            respones : expence
        },{ status: 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            error : error instanceof Error ? error?.message : String(error) ,
        }, {status:500})
    }
}