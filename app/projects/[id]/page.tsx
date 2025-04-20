"use client"

import {  useState } from "react"
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "@/components/BoardView";
import ListView from "@/components/ListView";
type Props ={
    params:{id:string}

} 

export default function Page({params}:Props) {
    const [activeTab,setActiveTab]=useState("Board")
    const [isModalNewTaskOpen,setIsModalNewTaskOpen]=useState(false)
    console.log(activeTab)
    return <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        {activeTab==="Board" && (<BoardView setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}
        {activeTab==="List" && (<ListView setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}

    </div>

}