import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

// GET OVERALL EXPENCES
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const totalAmount = await PRISMA.expences.aggregate({
      _sum: {
        amount: true,
      },
    });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // GET THE CURRENT MONTH START-DATE AND END-DATE
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 1);

    const currentMonthExpence = await PRISMA.expences.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        paymentDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return NextResponse.json({
      message: "Get the total amount",
      response: {
        overAllExpences: totalAmount._sum.amount || 0,
        currentMonthExpence: currentMonthExpence._sum.amount || 0,
      },
      status: 200,
    });
  } catch (error) {
    NextResponse.json({
      message: "Can't get the total amount",
      status: 500,
    });
  }
};

// POST EXPENCES
export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { amount, category, subject, userId, bankType, paymentDate } = body;

  try {
    const expences = await PRISMA.expences.create({
      data: {
        amount,
        category: Number(category),
        subject,
        userId,
        bankType: Number(bankType),
        paymentDate: new Date(paymentDate),
      },
      include: { user: true },
    });
    return NextResponse.json({
      message: "Exepnece created successfully",
      status: 201,
      response: expences,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Expences post failed",
      status: 500,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
