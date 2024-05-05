import {NextApiRequest,NextApiResponse} from 'next';
import {  without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        if(req.method === 'POST'){

            const {currentUser}=await serverAuth(req,res);
            const {movieId}=req.body;
            const existingMovies=await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }
            });
            if(!existingMovies){
                throw new Error('Id not found!')
            }
            const user=await prismadb.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data:{
                    favrouiteIds:{
                        push:movieId, 
                    }
                }
            })

            return res.status(200).json(user);
        }

        if(req.method === 'DELETE'){
            const {currentUser}=await serverAuth(req,res);
            const {movieId}=req.body;
            const existingMovies=await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }
            });
            if(!existingMovies){
                throw new Error('Id not found!')
            }
            const updatedFavouriteIds=without(currentUser.favrouiteIds,movieId);
            const updatedUser=await prismadb.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data:{
                    favrouiteIds:updatedFavouriteIds
                }
            });

            return res.status(200).json(updatedUser);

        }

        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
    
  
}