import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { routeHandlerFunction } from "@/lib/error-handler";
import { formatResponse } from "@/lib/response";

const PRISMA = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { title, userId, categoryType } = await req.json();
  try {
    const category = await PRISMA.category.create({
      data: { title, userId: Number(userId), categoryType },
      include: { user: true },
    });
    return formatResponse(category, "Category Created Successfully", 201);
  } catch (error) {
    return routeHandlerFunction(error);
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { searchParams } = req.nextUrl;
    const categoryType = searchParams.get("categoryType");
    let filterCategory: any = {};
    if (categoryType) {
      filterCategory.categoryType = categoryType;
    }
    const categoryList = await PRISMA.category.findMany({
      where: { ...filterCategory },
      orderBy: { createdAt: "asc" },
    });
    return formatResponse(categoryList, "Category Fetch Successfully", 200);
  } catch (error) {
    return routeHandlerFunction(error);
  }
};
