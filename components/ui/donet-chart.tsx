import React, { FC, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDonetChartBudget } from "@/app/hooks/useBudget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Skeleton } from "./skeleton";

const DonutChart: FC = () => {
  const { data: donetChartData, isLoading, isError } = useDonetChartBudget();

  const options: ApexOptions = {
    chart: { type: "donut" },
    labels: donetChartData?.response?.label ?? ["No Data"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 2560,
        options: {
          chart: { width: 330 },
          legend: { position: "right" },
        },
      },
    ],
  };

  return (
    <Card className="bg-cardBgColor border-2 border-gray-400/35 rounded-xl p-2 w-full h-full md:h-[260px]">
      <CardContent>
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-semibold text-tableHeaderTextColor pl-3 py-2">
              Current Month Expences
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto px-3 flex items-center justify-center">
          {isLoading ? (
            <Skeleton className="h-[50px] w-full bg-gray-400 rounded-full animate-pulse" />
          ) : Array.isArray(donetChartData?.response?.amount) &&
            donetChartData?.response?.amount.length > 0 ? (
            donetChartData && (
              <Chart
                options={options}
                series={donetChartData?.response?.amount ?? [100]}
                type="donut"
                width="400"
              />
            )
          ) : (
            <div className="w-full flex-1 flex items-center justify-center">
              No Data Found
            </div>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
