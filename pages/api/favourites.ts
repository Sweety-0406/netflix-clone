import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        if(req.method !== 'GET'){
            return res.status(405).end();
        }
        const {currentUser}=await serverAuth(req,res);
        const favouriteMovies=await prismadb.movie.findMany({
            where:{
                id:{
                    in:currentUser?.favrouiteIds,
                }
            }
        })

        return res.status(200).json(favouriteMovies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}


