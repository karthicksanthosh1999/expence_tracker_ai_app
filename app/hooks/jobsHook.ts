import { TJob, TJobResponse, TJobResponses } from '@/@types/jobTypes';
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';


const getAllJobs = async (): Promise<TJobResponses> => {
    const { data } = await axios.get(`/api/jobs`);
    return data;
}

const createJob = async (jobs: TJob): Promise<TJobResponse> => {
    const { data } = await axios.post(`/api/jobs`, jobs);
    return data
}

const updateJob = async ({ id, job }: { id: string; job: TJob }): Promise<TJobResponse> => {
    const { data } = await axios.put(`/api/jobs/${id}`, job)
    return data
}

const deleteJob = async (id: string): Promise<TJobResponse> => {
    const { data } = await axios.delete(`/api/jobs/${id}`);
    return data
}


export const useGetJobsHook = () => {
    return useQuery({
        queryFn: getAllJobs,
        queryKey: ['job'],
        staleTime: 1000 * 60 * 5
    })
}

export const useCreateJobHooks = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            toast.success("Job Created Successfully")
            queryClient.invalidateQueries({ queryKey: ['job'] })
        },
        onError: (err) => {
            toast.error(`Created Failed : ${err.message || "Something Went Wrong"}`)
            console.log(err)
        }
    })
}

export const useUpdateJobHooks = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateJob,
        onSuccess: () => {
            toast.success("Job Updated Successfully")
            queryClient.invalidateQueries({ queryKey: ['job'] })
        },
        onError: err => {
            toast.error(`Update Failed : ${err.message || "Something Went Wrong"}`)
            console.log(err)
        }
    })
}

export const useDeleteJobhook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            toast.success("Job Deleted Successfully")
            queryClient.invalidateQueries({ queryKey: ['job'] })
        },
        onError: err => {
            toast.error(`Delete Failed : ${err.message || "Something Went Wrong"}`)
            console.log(err)
        }
    })
}