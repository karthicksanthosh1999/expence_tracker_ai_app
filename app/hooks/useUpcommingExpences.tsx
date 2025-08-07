import axiosInstance from "@/lib/axiosInstance";
import {
  IUpcommingExpencesType,
  upcommingExpencesResponseType,
  upcommingSingleExpencesResponseType,
} from "../@types/upcomming_expences_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = async (): Promise<upcommingExpencesResponseType> => {
  const { data } = await axiosInstance.get(`/api/upcomming_expences`);
  return data;
};

const postData = async (
  upcommingExpences: IUpcommingExpencesType
): Promise<upcommingExpencesResponseType> => {
  const { data } = await axiosInstance.post(
    "/api/upcomming_expences",
    upcommingExpences
  );
  return data;
};

const deleteData = async (
  id: string
): Promise<upcommingSingleExpencesResponseType> => {
  const { data } = await axiosInstance.delete(`/api/upcomming_expences/${id}`);
  return data;
};

const fetchSingleUpcommingExpences = async (
  id: string
): Promise<upcommingSingleExpencesResponseType> => {
  const { data } = await axiosInstance.get(`/api/upcomming_expences/${id}`);
  return data;
};

const updateSingleUpcommingExpences = async ({
  id,
  ...upcommingExpences
}: IUpcommingExpencesType): Promise<upcommingExpencesResponseType> => {
  const { data } = await axiosInstance.put(
    `/api/upcomming_expences/${id}`,
    upcommingExpences
  );
  return data;
};

const upcommingExpencesDashboard =
  async (): Promise<upcommingExpencesResponseType> => {
    const { data } = await axiosInstance.get(
      "/api/upcomming_expences/dashboard"
    );
    return data;
  };

// HOOKS
export const useGetAllUpcommingExpences = () => {
  return useQuery({
    queryKey: ["upcomming_expences"],
    queryFn: fetchData,
  });
};

export const useCreateUpcommingExpences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["upcomming_expences"] }),
    onError: (err) => console.log(err),
  });
};

export const useDeleteUpcommingExpences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["upcomming_expences"] }),
    onError: (err) => console.log(err),
  });
};

export const useFetchUpcommingExpence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchSingleUpcommingExpences,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["upcomming_expences"] }),
    onError: (err) => console.log(err),
  });
};

export const useUpdateUpcommingExpences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSingleUpcommingExpences,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["upcomming_expences"] }),
    onError: (err) => console.log(err),
  });
};

export const useFetchDashboardUpcommingExpences = () => {
  return useQuery({
    queryKey: ["upcomming_expences"],
    queryFn: upcommingExpencesDashboard,
  });
};
