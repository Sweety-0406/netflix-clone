import React from "react";

interface MobileMenuProps{
    visible:boolean
}
const MobileMenu : React.FC<MobileMenuProps> =({visible})=>{
    if(!visible){
        return null;
    }
    return(
        <div className="bg-black border-2 border-gray-800 w-56 absolute top-8 left-8 py-5 flex flex-col  ">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:underline">
                    Home
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Series
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    files
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    New & Popular
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    My list
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Browse by Languages
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;