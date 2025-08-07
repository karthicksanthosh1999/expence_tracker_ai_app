"use client";
import { TPieChartBudgetResponse } from "@/app/@types/budgetTypes";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Separator } from "./separator";

const PieChart = () => {
  const [chartDataList, setChartDataList] = useState<
    {
      id: string;
      title: string;
      series: number[];
      options: ApexCharts.ApexOptions;
    }[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<TPieChartBudgetResponse>(
        `http://localhost:3000/api/budget/currentMonth`
      );

      const pieList = response.data.response;

      const processedCharts: any = pieList.map((item) => {
        const spent = item.percentage;
        const remaining = 100 - spent;

        return {
          id: item.id,
          title: item.title,
          series: [spent, remaining],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    color: "#fff",
                    showAlways: true,
                    show: true,
                  },
                },
              },
            },
          },
          stroke: {
            width: 0,
          },
          value: {
            offsetY: -15,
            color: "#D9D9D9",
            fontSize: "20px",
            fontWeight: 600,
            show: true,
          },
          options: {
            chart: {
              type: "donut",
            },
            labels: ["Spent", "Remaining"],
            legend: {
              position: "bottom",
              labels: {
                colors: "#ffffff",
              },
              markers: {
                width: 12,
                height: 12,
                strokeColor: false,
                strokeWidth: 0,
              },
              total: {
                show: true,
                label: "Spent",
                color: "#000",
                fontSize: "14px",
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: "100%",
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        };
      });

      setChartDataList(processedCharts);
    } catch (error) {
      console.error("Failed to fetch pie chart data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className=" bg-cardBgColor border-gray-400/35 rounded-xl border">
      <CardHeader>
        <CardTitle>
          <h1 className="text-lg font-semibold text-tableHeaderTextColor pl-3 py-2">
            Expences Status
          </h1>
        </CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {chartDataList.map((chart) => (
          <div key={chart.id} className="mx-auto text-center w-[60%]">
            <h3 className="text-lg font-semibold mb-2">{chart.title}</h3>
            <ReactApexChart
              options={chart.options}
              series={chart.series}
              type="donut"
              width="100%"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PieChart;
