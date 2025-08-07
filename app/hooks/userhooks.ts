import { TUserResponse } from "@/@types/userTypes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"

const getSingleUser = async (id: string): Promise<TUserResponse> => {
    const { data } = await axios.get(`/api/users/${id}`);
    return data
}


export const useGetSingleUserHook = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: getSingleUser,
        onSuccess: () => query.invalidateQueries({ queryKey: ['user'] }),
        onError: (err) => console.log(err),
    })
}