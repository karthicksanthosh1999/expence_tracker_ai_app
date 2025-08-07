import axiosInstance from "@/lib/axiosInstance";
import {
  IBudgetInput,
  IBudgetResponse,
  TbudgetDataResponse,
  TPieChartBudgetResponse,
} from "../@types/budgetTypes";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const getAllBudget = async (): Promise<IBudgetResponse> => {
  const { data } = await axiosInstance.get("/api/budget");
  return data;
};

const budgetChartData = async (id: string): Promise<TbudgetDataResponse> => {
  const { data } = await axiosInstance.get(
    `/api/budget/search?categoryId=${id}`
  );
  return data;
};

const budgetUpdate = async ({
  id,
  ...budget
}: IBudgetInput): Promise<IBudgetResponse> => {
  const { data } = await axiosInstance.put(`/api/budget/${id}`, budget);
  return data;
};

const donetChartBudget = async () => {
  const { data } = await axiosInstance.get(`/api/category/lable`);
  return data;
};

const pieChatBudget = async (): Promise<TPieChartBudgetResponse> => {
  const { data } = await axiosInstance.get(
    `http://localhost:3000/api/budget/currentMonth`
  );
  return data;
};

// HOOKS

const queryClient = new QueryClient();

export const createBudget = async (
  budget: IBudgetInput
): Promise<IBudgetResponse> => {
  const { data } = await axiosInstance.post("/api/budget", budget);
  return data;
};

export const useGetAllBudget = () => {
  return useQuery({
    queryFn: getAllBudget,
    queryKey: ["budget"],
  });
};

export const useCreateBudget = () => {
  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budget"] }),
    onError: (err) => console.log(err),
  });
};

export const useBudgetChart = () => {
  return useMutation({
    mutationFn: budgetChartData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budget"] }),
    onError: (err) => console.log(err),
  });
};

export const useUpdateBudget = () => {
  return useMutation({
    mutationFn: budgetUpdate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budget"] }),
    onError: (err) => console.log(err),
  });
};

export const useDonetChartBudget = () => {
  return useQuery({
    queryFn: donetChartBudget,
    queryKey: ["budget"],
  });
};

export const usePieChartMonthlyBudget = () => {
  return useQuery({
    queryFn: pieChatBudget,
    queryKey: ["budget"],
  });
};
