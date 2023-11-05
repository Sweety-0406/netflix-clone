import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export const userCurrentUser=()=>{
    const{data,error,isLoading,mutate}=useSWR('/api/current',fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

