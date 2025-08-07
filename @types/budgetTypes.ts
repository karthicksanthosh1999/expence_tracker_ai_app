import { IconType } from "react-icons/lib";

type budgetChartData = {
  date: string;
  amount: number;
};

export type IBudgetInput = {
  id?: string;
  title: string;
  limit: number;
  userId?: string;
};

export interface IBudgetResponse {
  message: string;
  response?: budgetChartData[];
  error?: string;
}
export interface IGetBudgetResponse {
  message: string;
  response?: IBudgetInput[];
  error?: string;
}

export type budgetData = {
  title: string;
  icon: IconType;
  totalBudget?: number;
  spendBudget?: number;
  spendingPercentage?: string;
  remainingPercentage?: string;
  lastMonthExpence?: number;
  currentMonthExpence?: number;
  remainingExpence?: number;
  chartData?: budgetChartData[];
};

export type TbudgetDataResponse = {
  message: string;
  response?: budgetData;
  error?: string;
};

export interface ITab {
  budgetData: budgetData[];
}

type TPieChartBudget = {
  id: string;
  title: string;
  limit: number;
  spent: number;
  percentage: number;
};

export type TPieChartBudgetResponse = {
  message: string;
  response: TPieChartBudget[];
};
