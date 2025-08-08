"use client";
import React from "react";
import DashboardBar from "@/app/admin/dashboard/components/dashboardBar";
import { useSession } from "next-auth/react";
import Dashboard from "../page";
import { ChartLineDotsColors } from "@/components/ui/charts/LineChart";
import { ChartAreaInteractive } from "@/components/ui/charts/AreaChart";
import { ChartPieDonutText } from "@/components/ui/charts/DonetChart";
import { ChartPieInteractive } from "@/components/ui/charts/PieChart";
import { ChartTooltipAdvanced } from "@/components/ui/charts/WeeklyChart";
import { ChartBarMixed } from "@/components/ui/charts/HorizondalBarChart";

const page = () => {
  const { data: session } = useSession();
  if (!session?.user?.name) {
    // redirect("dashboar ")
    console.log("dashboard main");
  }
  return (
    <Dashboard>
      <DashboardBar name={session?.user?.name ?? ""} />
      <ChartAreaInteractive />
      <div className="w-full flex gap-3 h-fit">
        <div className="w-[50%] ">
          <ChartLineDotsColors />
        </div>
        <div className="w-[50% ]">
          <ChartPieDonutText />
        </div>
      </div>
      <div className="w-full flex gap-3 h-fit">
        <div className="w-[50%] ">
          <ChartPieInteractive />
        </div>
        <div className="w-[50% ]">
          <ChartBarMixed />
        </div>
      </div>
      <div className="w-full flex gap-3 h-fit">
        <div className="w-[50%] ">
          <ChartTooltipAdvanced />
        </div>
        <div className="w-[50% ]">
          <ChartBarMixed />
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
