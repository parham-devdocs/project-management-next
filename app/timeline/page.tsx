"use client"
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { Project as ProjectType } from "../../database.types";
import { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/utils/databaseClient";
import {  parseISO } from "date-fns";
import Hedaer from '@/components/Header';
import { useSelector } from 'react-redux';

export default function TimeLine() {
    type TaskTypeItems="task"|"milestone" | "project"

    const [projects, setProjects] = useState<ProjectType[] | null>(null);
    const [errorMessage,setErrorMessage]=useState<PostgrestError | string>()
    const [loading, setLoading] = useState<boolean>(false);
    const isDarkMode=useSelector((state:any)=>{ return state.isDarkMode }) 
    async function fetchData() {
        setLoading(true)
        const { data, error }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Project")
                .select(`*`)
      
        if (error) {
            setLoading(false)
            setErrorMessage(error.message || "An unexpected error occurred");
            return;
        }
      
        if (!data || data.lenght === 0) {
            setLoading(false)
            setErrorMessage("No task available");
            setProjects(null);
            return;
        }
        setLoading(false)
        setProjects(data);
    }
      useEffect(()=>{
        fetchData()
      },[])
 
const project =useMemo(()=>{
   return projects?.map((item, i) => {
        return {
            
          start: item.startDate ? parseISO(String(item.startDate)) : new Date(2025, 1, i + 1), // Parse or fallback
          end: item.dueDate ? parseISO(String(item.dueDate)) : new Date(2025, 1, i + 4),       // Parse or fallback
          name: item.name || `Task ${i + 1}`,                                         // Default name
          id: `Task-${i}`,                                                             // Default ID
          type :"project" as TaskTypeItems ,
          progress:50,
          isDisabled: true,                                                            // Default disabled state
          styles: {
            progressColor: '#ffbb54',
            progressSelectedColor: '#ff9e0d',
            backgroundColor: "#ffbb54",
          },
        };
      }) || [];
},[projects]) 
return(
    <div className="   p-8 mt-8 h-screen ">
  <div className="  flex items-center justify-between ">
   <Hedaer name='Projects Timeline'/>
  </div>
    {loading && (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
  </div>
)}
    {errorMessage && (
      <p className="text-red-700 font-semibold text-3xl text-center mt-40">
        Something unexpected happened
      </p>
    )}
  
  
    {!errorMessage &&  projects?.length=== 0 && (
      <p className="text-red-700 font-semibold text-3xl text-center mt-40">
        No tasks available
      </p>
    )}

    {/* Gantt Chart */}
    {!errorMessage && projects && projects.length > 0 && (
      <div className="flex-grow ">
        <Gantt
          tasks={project}
          projectBackgroundColor={isDarkMode ? "#101214" :"#1f29317"}
          projectProgressColor={isDarkMode ? "#1f2937" :"#aeb8c2"}
          projectProgressSelectedColor={isDarkMode ? "#000" :"#9ba1a6"}
          arrowColor="#0000ff"
          todayColor="#ffcccc"
        
        />
        
      </div>
    
    )}
  </div>
)

}



