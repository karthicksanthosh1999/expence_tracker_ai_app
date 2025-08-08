import { PrismaClient } from "@/lib/generated/prisma";
import { ApiCustomError } from "@/utils/apiCutomError";
import { NextResponse, NextRequest } from "next/server";

const PRISMA = new PrismaClient();


export const DELETE = async(req:NextRequest, {params}:{ params : {id:string}}) => {
    try {
        const category = await PRISMA.category.delete({
            where: {id:  params.id }
        })
        if(!category){
            return NextResponse.json({
                message : "Budget not found"
            },{status:404})
        }
        return NextResponse.json({
            response : category,
            message : "Budget deleted successfully",
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
            error : error instanceof Error ? error.message : String(error)
        },{status:500})
    }
}

export const PUT = async(req:NextRequest, {params}:{params : {id:string}}) => {
    const { title, userId } = await req.json();
    try {
        if(!params.id){
            throw new ApiCustomError("Id is required!", 400)
        }
        const category = await PRISMA.category.update({
            where: {id : params.id},
            data: {title, userId}
        })
        return NextResponse.json({
            message : "Category Update Successfully",
            response : category
        }, { status : 200})
    } catch (error) {
        return NextResponse.json({
            message :"Internal Server Error",
            error : error instanceof Error ? error.message : String(error)
        },{status: 500})
    }
}

export const GET = async(req:NextRequest, {params}:{params : {id: string}} ) => {
    try {
        if(!params.id){
            throw new ApiCustomError("Id is required!",400)
        }
        const category = await PRISMA.category.findUnique({
            where : {id : params.id}
        })
        if(!category){
            throw new ApiCustomError("Category not found", 404)
        }
        return NextResponse.json({
            message : "Category Fetch Successfully",
            response : category
        }, { status : 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error",
            error : error instanceof Error ? error.message : String(error)
        }, { status : 500})
    }
}