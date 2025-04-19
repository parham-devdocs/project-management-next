"use client"

import {  useState } from "react"
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "@/components/BoardView";
type Props ={
    params:{id:string}

} 

export default function Page({params}:Props) {
    const [activeTab,setActiveTab]=useState("Board")
    const [isModalNewTaskOpen,setIsModalNewTaskOpen]=useState(false)
    return <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        {activeTab==="Board" && (<BoardView setIsModalOpen={setIsModalNewTaskOpen} id={params.id}/>)}
    </div>

}