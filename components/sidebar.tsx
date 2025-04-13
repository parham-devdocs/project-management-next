"use client"
import { AlertCircle, AlertOctagon, AlertTriangle, BriefcaseIcon, ChevronDown, ChevronUp, HomeIcon, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Logo from "../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsSidebarCollapsed } from "@/redux/store";
import { initialStateTypes } from "../redux/store";
import { usePathname } from "next/navigation";
import Link from "next/link"
export default function Sidebar() {
    const sidebarIcons:SidebarLinkType[]=[
{Icon:HomeIcon,href:"/",label:"Home",isCollapsed:false},
{Icon:BriefcaseIcon,href:"/briefcase",label:"Briefcase",isCollapsed:false},
{Icon:Search,href:"/search",label:"search",isCollapsed:false},
{Icon:Settings,href:"/seattings",label:"Settings",isCollapsed:false},
{Icon:User,href:"/user",label:"User",isCollapsed:false},
{Icon:Users,href:"/teams",label:"Teams",isCollapsed:false}

    ]
    const projectsIcons:SidebarLinkType[]=[
        {Icon:AlertCircle,href:"/priority/urgent",label:"Urgent",isCollapsed:false},
        {Icon:ShieldAlert,href:"/priority/high",label:"High",isCollapsed:false},
        {Icon:AlertTriangle,href:"/priority/medium",label:"Medium",isCollapsed:false},
        {Icon:AlertOctagon,href:"/priority/low",label:"Low",isCollapsed:false},
        {Icon:Layers3,href:"/priority/backlog",label:"Backlog",isCollapsed:false},
    ]
    const [showProjects,setShowProjects]=useState(true)
    const [showPriority,setShowPriority]=useState(true)
    const collapsed=useSelector((state:initialStateTypes)=>state.isSidebarCollapsed)

const dispatch=useDispatch()
const sidebarClassnames =` ${collapsed ? "w-0 hidden" : "w-64"} h-full z-40 bg-white shadow-xl flex flex-col  fixed transition-all duration-300 dark:bg-black overflow-y-auto `

function toggleSidebar() {
    dispatch(setIsSidebarCollapsed(true))
}
    return (
        <div className={sidebarClassnames}>
            <div className=" flex  items-center justify-between z-50 w-full h-[56px]  py-6 px-3 text-gray-800  bg-white dark:bg-black dark:text-white">
                <div className=" text-xl   font-bold">
                    EDLIST
                </div>
             <span className=" text-xl  cursor-pointer">  
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
            <nav className=" z-10 w-full ">
                {sidebarIcons.map((icon,index)=>{
                    return     <SidebarLink key={index} href={icon.href} label={icon.label}  Icon={icon.Icon} isCollapsed={icon.isCollapsed} />

                })}
                
            </nav>
            <button className=" w-full flex items-center justify-between px-3 py-3 text-gray-500 hover:bg-gray-100 cursor-pointer dark:text-gray-100 dark:hover:bg-gray-800 " onClick={()=>setShowProjects(prev=>!prev)}>
<span className="">Projects</span>
{showProjects ? <ChevronUp/> : <ChevronDown/>}
            </button>
            {showProjects && (
                <>
{projectsIcons.map((icon,index)=>{
    return <SidebarLink key={index} href={icon.href} label={icon.label}  Icon={icon.Icon} isCollapsed={icon.isCollapsed} />
})}
                
                </>
            )}
            <button className=" w-full flex items-center justify-between px-3 py-3 text-gray-500 hover:bg-gray-100 cursor-pointer dark:text-gray-100 dark:hover:bg-gray-800 " onClick={()=>setShowPriority(prev=>!prev)}>
<span className="">Priority</span>
{showPriority? <ChevronUp/> : <ChevronDown/>}</button>
        </div>
    )
}



interface SidebarLinkType{
    href:string
    Icon:LucideIcon
    label:string
    isCollapsed:boolean
}

const SidebarLink=({href,Icon,isCollapsed,label}:SidebarLinkType)=>{
const pathname=usePathname()
const isActive=pathname===href || (pathname=== "/" && href=== "/dashboard")

return (
    <Link className=" w-fit" href={href} >
        
        <div className={` relative flex cursor-pointer   gap-2 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-700" : ""} items-center py-3 px-8`}>
            <div className={`${isActive ? "  bg-blue-200":"bg-white dark:bg-black"} absolute left-0 top-0 h-[100%] w-[5px]`}></div><Icon className=" h-6 w-6 text-gray-800 dark:text-gray-100" /><span className={` font-bold text-[15px] text-gray-800 dark:text-gray-100`}>{label}</span></div>
    </Link>
)

}