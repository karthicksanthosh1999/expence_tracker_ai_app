import { PrismaClient } from "@/lib/generated/prisma"
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient()

export const GET = async (req: NextRequest) => {
    try {
      const { searchParams } = req.nextUrl;
  
      const page = parseInt(searchParams.get('page') || '1', 10);
      const limit = parseInt(searchParams.get('limit') || '10', 10);
      const search = searchParams.get('search') || '';
      const bankType = searchParams.get('bankType');
      const sortBy = searchParams.get('sortBy') || 'createdAt';
      const order = (searchParams.get('order') || 'desc').toLowerCase();
  
      const skip = (page - 1) * limit;
  
      const whereClause:any = {
        AND: [
          search
            ? {
                OR: [
                  { subject: { contains: search, mode: 'insensitive' } },
                  { bankType: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          bankType ? { bankType } : {},
        ],
      };
  
      const [expenses, total] = await Promise.all([
        PRISMA.expences.findMany({
          where: whereClause,
          include:{ categoryData: true, user: true, bankData: true },
          skip,
          take: limit,
          orderBy: {
            [sortBy]: order === 'asc' ? 'asc' : 'desc',
          },
        }),
        PRISMA.expences.count({ where: whereClause }),
      ]);
  
      return NextResponse.json({
        data: expenses,
        pagination: {
          total,
          page, 
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('[GET EXPENSES ERROR]', error);
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
};