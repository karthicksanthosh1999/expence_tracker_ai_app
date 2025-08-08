import { PRISMA } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, res:NextResponse) => {
    try {
        const { searchParams } = req.nextUrl;

        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10',10);
        const search = searchParams.get('search') || '';
        const bankType = searchParams.get('bankType');
        const status = searchParams.get('status')
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const order = (searchParams.get('order') || 'desc').toLowerCase();

        const skip = (page - 1) * limit;

        const whereClause: any = {
            AND: [
                search ? { OR : [
                    {subject :{ contains : search, mode: 'insensitive' }},
                    {bankType: { contains : search, mode: 'insensitive' }}
                ]} : {},
                bankType ? {bankType} : {},
                status ? {status} : {}
            ]
        }

        const [upcomming_Expences, total ]= await Promise.all([
            PRISMA.upcomming_Expences.findMany({
                where: whereClause,
                include: { categoryData: true, user: true, bankData: true },
                skip,
                take:limit,
                orderBy:{[sortBy]:order === 'asc' ? 'asc' : 'desc'}
            }),
             PRISMA.upcomming_Expences.count({where:whereClause})
        ])

        return NextResponse.json({
            message : "Exepences fetch successfully",
            data: upcomming_Expences,
            pagination:{
                total,
                page,
                pageSize: limit,
                totalPages: Math.ceil(total/limit)
            }, 
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message : "Insertnal server error",
            error
        },{status: 500})
    }
};