
import NavbarItems from "./NavbarItems";
import {SlArrowDown} from 'react-icons/sl'
import {BsSearch} from 'react-icons/bs'
import {FiBell} from 'react-icons/fi'
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";


const TOP_OFFSET=66;
const Navbar=()=>{
  const [showMobileMenu,setShowMobileMenu]=useState(false)
  const [showUserSignout,setShowUserSignout]=useState(false)
  const[showBg,setShowBg]=useState(false)

  useEffect(()=>{
    const scrollHandle=()=>{
      if(window.scrollY >= TOP_OFFSET){
        setShowBg(true);
      }else{
        setShowBg(false);
      }
    }
    
    window.addEventListener('scroll',scrollHandle);
    return ()=>{
      window.removeEventListener('scroll',scrollHandle)
    }

  },[])
  const toggleMobileMenu=useCallback(()=>{
    setShowMobileMenu((current)=>!current);
  },[])
  const toggleUserSignout=useCallback(()=>{
    setShowUserSignout((current)=>!current);
  },[])
    return (
        <div className=" w-full fixed z-40 ">
            <div className={`
              px-4
              md:px-4
              py-6
              flex
              flex-row
              items-center
              transition
              duration-500
              ${showBg?'bg-zinc-900 bg-opacity-90' : ''}

            `}>
              <img className="h-4 lg:h-7" src="/images/Logonetflix.png" alt="logo" />
              <div className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
              ">
                <NavbarItems label='Home' />
                <NavbarItems label='Series' />
                <NavbarItems label='Films' />
                <NavbarItems label='New & Popular' />
                <NavbarItems label='My List' />
                <NavbarItems label='Browse by Languages' />
              </div>
              <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <SlArrowDown className={`text-white transition ${showMobileMenu ? 'rotate-180':'rotate-0 '} ` }/>
                <MobileMenu visible={showMobileMenu} />
              </div> 
              <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                 <BsSearch />
                </div>
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                 <FiBell />
                </div>
                <div onClick={toggleUserSignout} className="flex flex-row items-center gap-2 cursor-pointer relative">
                  <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                    <img src="/images/blue_icon.jpg" alt="" />
                  </div>
                  <SlArrowDown className={`text-white transition ${showUserSignout ? 'rotate-180':'rotate-0 '} ` }/>
                </div>
                <AccountMenu visible={showUserSignout} />

              </div>
            </div>

        </div>
    )
}

export default Navbar;