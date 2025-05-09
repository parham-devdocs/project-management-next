import supabase from "@/utils/databaseClient";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Task as TaskType } from "../database.types";
import Hedaer from "./Header";
import TaskCard from "./TaskCard";

export default function ListView({ id, setIsModalOpen }: { id: string; setIsModalOpen: (open: boolean) => void }) {
    const [task, setTask] = useState<TaskType[] | null>(null);
    
const [errorMessage,setErrorMessage]=useState<PostgrestError | string>()
    async function fetchData() {
        const { data: tasks, error }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select(`*`)
                .eq("projectid", id);
      
        if (error) {
            setErrorMessage(error.message || "An unexpected error occurred");
            return;
        }
      
        if (!tasks || tasks.length === 0) {
            setErrorMessage("No task available");
            setTask(null);
            return;
        }
        setTask(tasks);
    }
      useEffect(()=>{
        fetchData()

      },[])
    return <div className=" px-4 pb-8 xl:px-6">
        <div className=" pt-5">
            <Hedaer name="List" buttonComponent={ <button className=" flex items-center bg-blue-primary px-3 py-2 rounded-md text-white hover:bg-blue-600 " onClick={()=>{setIsModalOpen(true)}}>Add Task</button>}/>
        </div>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {task?.map((task:TaskType)=>{
                return             <TaskCard key={task.id} task={task}/>


            })}
        </div>
    </div>
}