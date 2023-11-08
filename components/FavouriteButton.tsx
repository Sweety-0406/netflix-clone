import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { userCurrentUser } from "@/hooks/userCurrentUser";
import useFavourite from "@/hooks/useFavourites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface favouriteButtonProps{
    movieId:string
}

const FavouriteButton:React.FC<favouriteButtonProps>=({movieId})=>{
    const{mutate:mutateFavourites}=useFavourite();
    const {data:currentUser,mutate}=userCurrentUser();
    
    const isFavourite=useMemo(()=>{
      const list=currentUser?. favrouiteIds || [];
      return list.includes(movieId);
    },[currentUser,movieId]);

    const toggleFavourites=useCallback(async ()=>{
       let response;
       if(isFavourite){
        response=await axios.delete('/api/favourite',{data:{movieId}});
       }else{
        response=await axios.post('/api/favourite',{movieId});
       }

       const updatedFavouriteIds=response?.data?.favrouiteIds;

       mutate({
        ...currentUser,
        favrouiteIds:updatedFavouriteIds
       });

       mutateFavourites();

    },[movieId,isFavourite,currentUser,mutate,mutateFavourites])

    const Icon=isFavourite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div
         onClick={toggleFavourites}
        className="
         cursor-pointer
         group/item
         w-6 lg:w-10
         h-6 lg:h-10
         border-white
         border-2
         rounded-full
         flex
         justify-center
         items-center
         transition
         hover:border-neutral-300
        ">
        <Icon className="text-white "size={25}/>
        
        </div>
    )
}
export default FavouriteButton;