import Input from "@/components/input";
import {useCallback, useState} from 'react'
import axios from "axios";
import { signIn } from "next-auth/react";

import {FcGoogle} from 'react-icons/fc'; //npm install react-icons
import {FaGithub} from 'react-icons/fa'

const Auth=()=>{
    const[email,setEmail]=useState('')
    const[name,setName]=useState('')
    const[password,setPassword]=useState('')

    const[variant,setVariant]=useState('login')

    const toggleVariant=useCallback(()=>{
        setVariant((currentVariant)=>currentVariant === 'login' ? 'register' : 'login')
    },[])

    const login=useCallback(async ()=>{
      try {
        await signIn('credentials',{
          email,
          password,
          redirect:true,
          callbackUrl:'/profiles'
        });
        
      } catch (error) {
        console.log(error);
      }
    },[email,password])

    const register=useCallback(async ()=>{
      try {
         await axios.post('/api/register',{
          email,
          name,
          password
        });
        login();
      } catch (error) {
         console.log(error)
      }
    },[email,password,name,login]);

    

  return(
    <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-center bg-cover bg-no-repeat bg-fixed">
        <div className="bg-black w-full h-full lg:bg-opacity-50 ">
            <nav className="px-10 py-5 ">
                 <img src="/images/Logonetflix.png" alt="Logo" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-1 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                       {variant==='login' ? 'Sign in' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant==='register' && (
                       <Input
                          id="name"
                          onChange={(e:any)=>{setName(e.target.value)}}
                          value={name}
                          label="Username"
                        />
                        )}
                        <Input
                          id="email"
                          type="email"
                          onChange={(e:any)=>{setEmail(e.target.value)}}
                          value={email}
                          label="Email"
                        />
                        <Input
                          id="password"
                          type="password"
                          onChange={(e:any)=>{setPassword(e.target.value)}}
                          value={password}
                          label="Password"
                        />
                    </div>
                    <button onClick={variant === 'login'? login : register } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                          {variant==='login'? 'Login':'Sign up'}
                    </button>

                      <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                        <div
                        onClick={()=>signIn('google',{redirect:false, callbackUrl:'/profiles'})}
                         className="
                          w-10
                          h-10
                          bg-white
                          rounded-full
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                          hover:opacity-80
                          transition
                         " 
                        >
                          <FcGoogle size={30}/>
                        </div>
                        <div
                        onClick={()=>signIn('github',{redirect:false,callbackUrl:'/profiles'})}
                         className="
                          w-10
                          h-10
                          bg-white
                          rounded-full
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                          hover:opacity-80
                          transition
                         " 
                        >
                          <FaGithub size={30}/>
                        </div>

                      </div>

                    <p className="text-neutral-500 mt-12 mb-4">
                        {variant==='login'?'New to Netflix?':'Already have an account?'}
                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                            {variant==='login'?'Sign up now':'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>    
    </div>
  )
}


export default Auth;
