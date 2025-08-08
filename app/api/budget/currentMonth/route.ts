// app/api/budget/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PRISMA } from "@/lib/utils";
import { startOfMonth, startOfNextMonth } from "@/utils/dateUtils";

export const GET = async (res: NextResponse, req: NextRequest) => {
  try {
    // 1️⃣  All budgets with the linked category record
    const budgets = await PRISMA.budget.findMany({
      include: { category: true },
    });

    // 2️⃣  Sum of expenses for the current month, grouped by category
    const spentByCategory = await PRISMA.expences.groupBy({
      by: ["category"],
      _sum: { amount: true },
      where: {
        paymentDate: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
    });

    // 3️⃣  Merge the two result sets
    const categories = budgets.map((b) => {
      const spentObj = spentByCategory.find(
        (s) => s.category === b.category.id
      );
      const spent = spentObj?._sum.amount ?? 0;

      return {
        id: b.category.id,
        title: b.category.title,
        limit: b.limit,
        spent, // total spent this month
        percentage: Number(((spent / b.limit) * 100).toFixed(2)), // 2‑dp
      };
    });

    // 4️⃣  Optionally add categories that have spending but no budget
    spentByCategory.forEach((s) => {
      if (!categories.some((c) => c.id === s.category)) {
        categories.push({
          id: s.category,
          title: "Un-budgeted", // customise as you like
          limit: 0,
          spent: s._sum.amount || 0,
          percentage: 0, // no limit → no %
        });
      }
    });

    return NextResponse.json(
      {
        message: "Budget fetched successfully",
        response: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
