import { NextPageContext } from "next";
import {userCurrentUser} from '@/hooks/userCurrentUser'
import { getSession, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourite from "@/hooks/useFavourites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

 export async function getServerSideProps(context:NextPageContext){
   const session=await getSession(context);

   if(!session){
     return {
      redirect:{
        destination:'/auth',
        permanent:false
      }
     }
   }
   return {
    props:{}
   }
 }

export default function Home() {
  const {data:movies=[]}=useMovieList()
  const {data:favourites=[]}=useFavourite()
  const {isOpen,closeModal}=useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favourites} />
      </div>
    </>
  )
}


