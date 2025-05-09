import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {initialStateTypes, setIsDarkMode, setIsSidebarCollapsed  } from "../redux/store";
import supabase from "@/utils/databaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
    const dispatch=useDispatch()
    const isSidebarCollapsed=useSelector((state:initialStateTypes)=>state.isSidebarCollapsed)
const isDarkMode=useSelector((state:initialStateTypes)=>state.isDarkMode)

    return <div className=" flex items-center justify-between px-4 py-3 dark:bg-black w-full">
        <div className=" flex items-center gap-8">
            {!isSidebarCollapsed ? null :<button onClick={()=>dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                <Menu className=" "/>
            </button> }
            <div className=" relative flex h-min w-[200px] items-center ">
                <Search className=" absolute left-[4px] mr-2 h-5 w-5  transform cursor-pointer dark:text-white"/> 
                <input type="search" placeholder="search ..." className=" w-full rounded-md border-none bg-gray-100 p-2 pl-8 placeholder:text-gray-500 focus:border-transparent focus:outline-0 dark:bg-gray-700 dark:placeholder:text-white" />
            </div>
           
        </div>
        <div className=" flex items-center gap-2">
            <button className=" cursor-pointer dark:text-white" onClick={()=>dispatch(setIsDarkMode(!isDarkMode))}>{isDarkMode ? <Sun/> : <Moon/>} </button>
                <Link href={"/setting"} className=" h-min w-min rounded-xl p-2 hover:bg-gray-100">
                <Settings className=" h-6 w-6 cursor-pointer dark:text-white"/>
                </Link>

                <div className=" ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
            </div>
                </div>
}