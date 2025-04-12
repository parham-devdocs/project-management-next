"use client"
import { LockIcon, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Logo from "../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsSidebarCollapsed } from "@/redux/store";
import { initialStateTypes } from "../redux/store";
export default function Sidebar({toggleSidebar}:{toggleSidebar:()=>void}) {
    const [showProjects,setShowProjects]=useState(true)
    const [showPriority,setShowPriority]=useState(true)
    const collapsed=useSelector((state:initialStateTypes)=>state.isSidebarCollapsed)

const dispatch=useDispatch()
const sidebarClassnames =` w-64 h-full z-40 bg-white shadow-xl flex flex-col  fixed transition-all duration-300 dark:bg-black overflow-y-auto `

// function toggleSidebar() {
//     dispatch(setIsSidebarCollapsed(false))
// }
    return (
        <div className={sidebarClassnames}>
            <div className=" flex  items-center justify-between z-50 w-full h-[56px]  py-6 px-3 bg-white data:bg-black">
                <div className=" text-xl text-gray-800 font-bold dark:text-white">
                    EDLIST
                </div>
             <span className=" text-xl text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-300 cursor-pointer">  
               <X onClick={toggleSidebar}/>
             </span>
            </div>
            <div className=" flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
               <Image src={Logo} alt="Logo" width={40} height={40}/>
               <div>
               <h3 className=" text-[15px] font-bold tracking-widest dark:text-gray-200">Team</h3>
               <div className="mt-1 flex items-center gap-2">
  <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-500" />
  <p className="text-xs text-gray-500">Private</p>
</div>
               </div>
              
            </div>
        </div>
    )
}