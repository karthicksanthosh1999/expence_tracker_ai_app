import { NextRequest, NextResponse } from "next/server";
import { PRISMA } from "@/lib/utils"; // your prisma client
import { ApiCustomError } from "@/utils/apiCutomError";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  try {
    const categoryId = searchParams.get("categoryId") || "";

    if (!categoryId) {
      throw new ApiCustomError("CategoryID is required!", 400);
    }

    // Get first and next month date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Get budget info for this category
    const budget = await PRISMA.budget.findMany({
      where: { title: categoryId },
      include: { category: true },
    });

    // Get total expenses for this category in current month
    const totalAmount = await PRISMA.expences.aggregate({
      _sum: {
        amount: true,
      },
      where: {
         category:categoryId,
        paymentDate: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
    });

    const totalBudget = budget[0]?.limit || 0;
    const currentMonthExpence = totalAmount._sum.amount || 0;
    const remainingExpence = totalBudget - currentMonthExpence;

    const spendingPercentage = totalBudget
      ? (currentMonthExpence / totalBudget) * 100
      : 0;
    const remainingPercentage = totalBudget
      ? (remainingExpence / totalBudget) * 100
      : 0;


      //EXPENCES CHART 
      const expencesChart = await PRISMA.expences.findMany({
        where: {
          category: categoryId,
          paymentDate: {
            gte:startOfMonth,
            lte:startOfNextMonth
          },
        },
        select:{
          amount: true,
          paymentDate: true
        }
      })

          // 🔥 Build chartData
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const chartMap: { [key: string]: number } = {};

    // Sum expenses by day
    expencesChart.forEach((expense) => {
      const day = format(expense?.paymentDate, "d MMM"); // "5 Jan"
      chartMap[day] = (chartMap[day] || 0) + expense.amount;
    });

    // Fill all days with default 0 if no data
    const chartData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(now.getFullYear(), now.getMonth(), i);
      const formatted = format(dateObj, "d MMM");
      chartData.push({
        date: formatted,
        amount: chartMap[formatted] || 0,
      });
    }

    const response = {
      title: budget[0]?.category?.title || "N/A",
      totalBudget,
      currentMonthExpence,
      lastMonthExpence: 0,
      remainingExpence,
      spendBudget: currentMonthExpence,
      remainingPercentage : Math.floor(remainingPercentage),
      spendingPercentage : Math.floor(spendingPercentage),
      chartData
    };

    return NextResponse.json({
      message: "Budget Get Successfully",
      status: 200,
      response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        status: 500,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
