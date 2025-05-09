import { useSelector } from "react-redux";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { Task as TaskType } from "../database.types";
import { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/utils/databaseClient";
import { format, parseISO } from "date-fns";
import Select from "./Select";
type TaskTypeItems="task"|"milestone" | "project"
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function TimeLine({ id, setIsModalOpen }: { id: string; setIsModalOpen: (open: boolean) => void }) {
    const [task, setTask] = useState<TaskType[] | null>(null);
    const [errorMessage,setErrorMessage]=useState<PostgrestError | string>()
    const [loading, setLoading] = useState<boolean>(false);
     
    async function fetchData() {
        setLoading(true)
        const { data: tasks, error }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select(`*`)
                .eq("projectid", id);
      
        if (error) {
            setLoading(false)
            setErrorMessage(error.message || "An unexpected error occurred");
            return;
        }
      
        if (!tasks || tasks.length === 0) {
            setLoading(false)
            setErrorMessage("No task available");
            setTask(null);
            return;
        }
        setLoading(false)
        setTask(tasks);
        console.log(tasks)
    }
      useEffect(()=>{
        fetchData()

      },[])
 
const tasks: Task[] =useMemo(()=>{
   return task?.map((item, i) => {
        return {
          start: item.startdate ? parseISO(String(item.startdate)) : new Date(2025, 1, i + 1), // Parse or fallback
          end: item.duedate ? parseISO(String(item.duedate)) : new Date(2025, 1, i + 4),       // Parse or fallback
          name: item.title || `Task ${i + 1}`,                                         // Default name
          id: `Task-${i}`,                                                             // Default ID
          type: 'task',
          progress:item.points ? item.points*10 : 0,                                                                 // Default progress
          isDisabled: true,                                                            // Default disabled state
          styles: {
            progressColor: '#ffbb54',
            progressSelectedColor: '#ff9e0d',
            backgroundColor: "#ffbb54",
          },
        };
      }) || [];
},[task]) 
return(
    <div className="mt-8 px-9 h-screen flex flex-col gap-5">
  <div className=" flex items-center justify-between ">
    <p className="font-bold text-2xl dark:text-white text-dark-bg">
      Project Task Timeline
    </p>
   <Select data={months} name="months"/>
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
  
  
    {!errorMessage && tasks.length === 0 && (
      <p className="text-red-700 font-semibold text-3xl text-center mt-40">
        No tasks available
      </p>
    )}

    {/* Gantt Chart */}
    {!errorMessage && tasks && tasks.length > 0 && (
      <div className="flex-grow overflow-auto">
        <Gantt
          tasks={tasks}
          arrowColor="#0000ff"
          todayColor="#ffcccc"
          barBackgroundColor="#e0e0e0"
          barBackgroundSelectedColor="#c0c0c0"
          barCornerRadius={5}
        />
        <div className=" w-full bg-white dark:bg-dark-tertiary dark:text-white py-2 shadow-2xs  mt-3.5">
          <button className=" bg-blue-700 text-white px-2 py-2 rounded-[5px] cursor-pointer hover:bg-blue-800 transition-colors duration-300">Add New Task</button>
        </div>
      </div>
    
    )}
  </div>
)

}



