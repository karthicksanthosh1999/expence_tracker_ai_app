import { routeHandlerFunction } from "@/lib/error-handler";
import { PrismaClient } from "@/lib/generated/prisma";
import { formatResponse } from "@/lib/response";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

// CREATE BANK
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { title, accountNo, ifcode, location, userId } = await req.json();
  try {
    const bank = await PRISMA.bank.create({
      data: { title, userId: Number(userId), accountNo, ifcode, location },
      include: { user: true },
    });
    return formatResponse(bank, "Bank created successfully", 201);
  } catch (error) {
    return routeHandlerFunction(error);
  }
};

// GET SINGLE BANK
export const GET = async () => {
  try {
    const banks = await PRISMA.bank.findMany({
      include: { user: true },
    });
    return formatResponse(banks, "Banks fetched successfully", 200);
  } catch (error) {
    return routeHandlerFunction(error);
  }
};
