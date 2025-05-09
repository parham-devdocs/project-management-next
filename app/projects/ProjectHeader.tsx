import Hedaer from "@/components/Header";
import ModalNewProject from "@/components/ModalNewProject";
import { Clock, Filter, FilterIcon, GitBranch, Grid3X3, List, PlusIcon, PlusSquare, Table } from "lucide-react";
import { ReactNode, useState } from "react";

 type Props = {
    activeTab:string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>; // Type of the setter function
  }

export default function ProjectHeader({activeTab,setActiveTab}:Props) {
  const [isModalNewProjectOpen,setIsModalNewProjectOpen]=useState(false)
    return (
      <div className=" px-4 xl:px-6">
        <ModalNewProject isOpen={isModalNewProjectOpen} onclose={()=>{setIsModalNewProjectOpen(false);console.log("closed")}}/>

        
          <div className=" flex justify-between items-center ">

        <Hedaer  name="project Design Development" buttonComponent={<button onClick={()=>setIsModalNewProjectOpen(true)} className="bg-blue-600 flex items-center gap-2 hover:bg-blue-800 dark:hover:bg-gray-800 cursor-pointer font-bold dark:bg-gray-700 text-white rounded-[5px] py-2 px-3 whitespace-nowrap">
 <PlusSquare size={15}/> New Boards
</button>}/>
        
        </div>
<div className=" flex items-center gap-5 flex-wrap-reverse justify-between w-full">
  <div className=" flex  gap-5 ">
          <TabButton name="Board" icon={<Grid3X3/>} setActiveTab={setActiveTab} activeTab={activeTab}/>
          <TabButton name="List" icon={<List/>} setActiveTab={setActiveTab} activeTab={activeTab}/>
          <TabButton name="Timeline" icon={<Clock/>} setActiveTab={setActiveTab} activeTab={activeTab}/>
          <TabButton name="Table" icon={<Table/>} setActiveTab={setActiveTab} activeTab={activeTab}/>
        </div>

        <div className=" flex items-center gap-2">
    <button className=" text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 cursor-pointer">{<Filter size={20}/>}</button>
    <button className=" text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 cursor-pointer">{<GitBranch size={20}/>}</button>
<div className=" relative ">
  <input type="text" placeholder="Search Task" className=" rounded-md border py-1 pl-10 pr-4 transition-colors focus:border-blue-500 duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white" />
<Grid3X3 className=" absolute left-3 top-[5px] h-4 w-4 text-gray-400 dark:text-neutral-500"/>
</div>
  </div>
</div>
        
      </div>
    )
}


type TabButtonPtops={
  name:string
  icon:ReactNode
  setActiveTab:React.Dispatch<React.SetStateAction<string>>
  activeTab:string
}


const TabButton=({name,icon,setActiveTab,activeTab}:TabButtonPtops)=>{
  const isActive=activeTab ===name
return <button onClick={()=>setActiveTab(name)} className={`flex gap-2 items-center cursor-pointer font-bold transition-colors duration-300 relative ${isActive ? "after:absolute after:rounded-3xl after:bottom-0 after:-mb-2 after:w-full after:h-1 after:bg-blue-500 dark:after:bg-white dark:text-white text-blue-500":"text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-white"}`}>{icon} {name}</button>
}