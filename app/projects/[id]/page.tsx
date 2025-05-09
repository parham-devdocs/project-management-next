"use client"

import {  useState } from "react"
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "@/components/BoardView";
import ListView from "@/components/ListView";
import TimeLine from "@/components/TimeLine";
import Table from "@/components/Table";
import ModalNewTask from "@/components/ModalNewTask";
type Props ={
    params:{id:string}

} 

export default function Page({params}:Props) {
    const [activeTab,setActiveTab]=useState("Board")
    const [isModalNewTaskOpen,setIsModalNewTaskOpen]=useState(false)

    return <div>
        <ModalNewTask isOpen={isModalNewTaskOpen} onclose={()=>{setIsModalNewTaskOpen(false)}}/>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        {activeTab==="Board" && (<BoardView setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}
        {activeTab==="List" && (<ListView setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}
        {activeTab==="Timeline" && (<TimeLine setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}
        {activeTab==="Table" && (<Table setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}


    </div>

}