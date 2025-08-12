import axiosInstance from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory, ICategoryResponse } from "@/@types/expencesTypes";
import { TSingleCategoryResponseType } from "@/@types/categoryTypes";

export const filterCategory = async (
  categoryType?: string
): Promise<ICategoryResponse> => {
  const { data } = await axiosInstance.get(
    `/api/category?categoryType=${categoryType ?? ""}`
  );
  return data;
};

const deleteCategory = async (id: string): Promise<ICategoryResponse> => {
  const { data } = await axiosInstance.delete(`/api/category/${id}`);
  return data;
};

const fetchSingleCategory = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/category/${id}`);
  return data;
};

export const createCategory = async (
  category: ICategory
): Promise<TSingleCategoryResponseType> => {
  const { data } = await axiosInstance.post("/api/category", category);
  return data;
};

const updateCategory = async ({
  id,
  ...category
}: ICategory): Promise<ICategoryResponse> => {
  const { data } = await axiosInstance.put(`/api/category/${id}`, category);
  return data;
};

// HOOKS

export const useGetCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: filterCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
    onError: (err) => console.log(err),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
    onError: (err) => console.log(err),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
    onError: (err) => console.log(err),
  });
};

export const useBudgetCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
    onError: (err) => console.log(err),
  });
};

export const useGetSingleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchSingleCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
    onError: (err) => console.log(err),
  });
};
