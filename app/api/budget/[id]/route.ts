import { PrismaClient } from "@/lib/generated/prisma";
import { ApiCustomError } from "@/utils/apiCutomError";
import { NextResponse, NextRequest } from "next/server";

const PRISMA = new PrismaClient();

export const GET = async(_req:NextRequest,{params} : { params: {id : string}}) => {
    try {
        const expence = await PRISMA.budget.findUnique({
            where : {
                id : params.id
            },
            include: {
                user: true
            }
        })
        if(!expence){
            return NextResponse.json({
                message: "bu.budget not found",
                status : 404
            })
        }
        return NextResponse.json({
            message : "bu.budget fetch successfully",
            status: 200,
            responses: expence
        })
    } catch (error) {
        return NextResponse.json({
            message: "bu.budget fetch failds",
            status: 500,
            error: error instanceof Error ? error.message : String(error)
        })
    }
} 

export const DELETE = async(req:NextRequest, {params}:{ params : {id:string}}) => {
    try {
        const budget = await PRISMA.budget.delete({
            where: {id:params?.id}
        })
        if(!budget){
            return NextResponse.json({
                message : "Budget not found"
            },{status:404})
        }
        return NextResponse.json({
            response : budget,
            message : "Budget deleted successfully",
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
        },{status:500})
    }
}

export const PUT = async(req:NextRequest, {params} : {params : {id: string}}) => {
    try {
        const { title, limit, userId } = await req.json()
        if(!params.id){
            throw new ApiCustomError("id is required!",404)
        }
        const budget = await PRISMA.budget.update({
            where: {id: params.id},
            data: { limit, title, userId }
        }) 

        if(!budget){
            throw new ApiCustomError("Budget not found",404)
        }
        return NextResponse.json({
            message : "Budget updated successfully",
            response: budget
        }, { status : 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
            error : error instanceof Error ? error.message : String(error)
        }, { status : 500})
    }
}

