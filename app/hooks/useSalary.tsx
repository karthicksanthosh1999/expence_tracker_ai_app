import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { ISalary } from "../@types/salaryType";

export interface ISalaryResponse {
  message?: string;
  error?: any;
  response?: {
    amount: number;
    salaryDate: string;
    expence: number;
    remaining: number;
    id?: string;
  };
}

// HOOKS
const fetchSalary = async (): Promise<ISalaryResponse> => {
  const { data } = await axiosInstance.get("/api/salary");
  return data;
};

const createSalary = async (salary: ISalary) => {
  const { data } = await axiosInstance.post("/api/salary", salary);
  return data.response;
};

const deleteSalary = async (id: string): Promise<ISalaryResponse> => {
  const { data } = await axiosInstance.delete(`/api/salary/${id}`);
  return data;
};

const fetchSingleSalary = async (id: string): Promise<ISalary> => {
  const { data } = await axiosInstance.get(`/api/salary/${id}`);
  return data?.response;
};

const updateSalary = async ({ id, ...salary }: ISalary): Promise<ISalary> => {
  const { data } = await axiosInstance.put(`/api/salary/${id}`, salary);
  return data;
};

// QUERES

export const useSalary = () => {
  return useQuery({
    queryKey: ["salary"],
    queryFn: fetchSalary,
  });
};

export const useCreateSalary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSalary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["salary"] }),
    onError: (err) => console.log(err),
  });
};

export const useDeleteSalary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSalary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["salary"] }),
    onError: (err) => console.log(err),
  });
};

export const useSingleSalaryFetch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchSingleSalary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["salary"] }),
    onError: (err) => console.log(err),
  });
};

export const useUpdateSalary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSalary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["salary"] }),
    onError: (err) => console.log(err),
  });
};
