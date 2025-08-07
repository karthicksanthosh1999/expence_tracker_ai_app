import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "axios";
import {
  expencesType,
  TExpencesResponseType,
  TSingleExpencesResponseType,
} from "@/@types/expencesTypes";

// types.ts

export interface ExpenseResponse {
  data: expencesType[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

interface GetExpensesParams {
  page: number;
  limit: number;
  search?: string;
  bankType?: string;
}

const fetchExpences = async (): Promise<TExpencesResponseType> => {
  const { data } = await axiosInstance.get("/api/expences");
  return data.response;
};

const createExpences = async (
  expence: expencesType
): Promise<expencesType[]> => {
  const { data } = await axiosInstance.post("/api/expences", expence);
  return data.response;
};

const fetchExpence = async (
  id: string
): Promise<TSingleExpencesResponseType> => {
  const { data } = await axiosInstance.get(`/api/expences/${id}`);
  return data;
};

const updateExpence = async ({
  id,
  ...expence
}: expencesType): Promise<expencesType> => {
  const { data } = await axiosInstance.put(`/api/expences/${id}`, expence);
  return data;
};

const deleteExpences = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/expences/${id}`);
};

export const getOverAllExpences = async (): Promise<ExpenseResponse> => {
  const { data } = await axiosInstance.get(`/api/expences/filter`);
  return data;
};

export const getExpencesAmount = async () => {
  const { data } = await axiosInstance.get(`/api/expences`);
  return {
    overAllExpences: data.response?.overAllExpences,
    currentMonthExpence: data.response?.currentMonthExpence,
  };
};

// HOOKS

export const useExpence = () => {
  return useQuery({
    queryKey: ["expence"],
    queryFn: fetchExpences,
  });
};

export const useSingleExpence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchExpence,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expence"] }),
    onError: (err) => console.log(err),
  });
};

export const useCreateExpence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpences,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expence"] }),
    onError: (error) => console.log(error),
  });
};

export const useUpdateExpence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpence,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expence"] }),
    onError: (error) => console.log(error),
  });
};

export const useDeleteExpence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpences,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expence"] }),
    onError: (error) => console.log(error),
  });
};

export const useGetAllExpences = (params: GetExpensesParams) => {
  return useQuery({
    queryKey: ["expence", params],
    queryFn: () => getOverAllExpences(params),
  });
};

export const useGetAllExpencesFilter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchExpences,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expence"] }),
    onError: (err) => console.log(err),
  });
};

export const useGetAllExpencesAmount = () => {
  return useQuery({
    queryKey: ["expence"],
    queryFn: getExpencesAmount,
  });
};
