import { PRISMA } from "@/lib/utils";
import { startOfNextMonth, startOfMonth } from "@/utils/dateUtils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const categorylables = await PRISMA.category.findMany();
    const expences = await PRISMA.expences.findMany({
      where: {
        paymentDate: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      include: { categoryData: true },
    });
    const newLabels = categorylables.map((cat) => cat.title);
    const newSeries = expences.map((item) => item.amount);
    return NextResponse.json(
      {
        message: "Category Fetch Successfully",
        response: {
          label: newLabels ?? ["No Data"],
          amount: newSeries ?? [100],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    });
  }
};
