import axiosInstance from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBank, upcommingSingleBankResponseType } from "@/@types/bankTypes";

const fetchBank = async () => {
  const { data } = await axiosInstance.get("/api/bank");
  return data?.response;
};

const createBank = async (
  bank: IBank
): Promise<upcommingSingleBankResponseType> => {
  const { data } = await axiosInstance.post("/api/bank", bank);
  return data;
};

const deleteBank = async (
  id: string
): Promise<upcommingSingleBankResponseType> => {
  const { data } = await axiosInstance.delete(`/api/bank/${id}`);
  return data;
};

const fetchSingleBank = async (
  id: string
): Promise<upcommingSingleBankResponseType> => {
  const { data } = await axiosInstance.get(`/api/bank/${id}`);
  return data;
};

const updateBank = async ({
  id,
  ...bank
}: IBank): Promise<upcommingSingleBankResponseType> => {
  const { data } = await axiosInstance.put(`/api/bank/${id}`);
  return data;
};

// HOOKS

export const useGetBank = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: fetchBank,
  });
};

export const useCreateBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBank,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bank"] }),
    onError: (err) => console.log(err),
  });
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBank,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bank"] }),
    onError: (err) => console.log(err),
  });
};

export const useFetchBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchSingleBank,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bank"] }),
    onError: (err) => console.log(err),
  });
};

export const useUpdateBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBank,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bank"] }),
    onError: (err) => console.log(err),
  });
};
