import { signOut } from "next-auth/react";
import React from "react";
interface AccountMenuProps{
    visible:boolean
}

const AccountMenu:React.FC<AccountMenuProps> =({visible})=>{
   if(!visible){
    return null
   }
   return(
    <div className="bg-black w-56 absolute top-20 right-8 py-5 flex-col border-2 border-gray-800 flex">
       <div className="flex flex-col gap-3">
         <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
           <img className="w-8 rounded-md" src="/images/blue_icon.jpg" alt="icon" />
            <p className="text-white text-sm group-hover/item:underline">
            username
            </p>
         </div>
         <hr className="bg-gray-600 border-0 h-px my-3" />
         <div onClick={()=>signOut} className="px-3 text-white text-sm text-center hover:underline">
             Sign out from Netflix
         </div>
       </div> 

    </div>
   )
}

export default AccountMenu;