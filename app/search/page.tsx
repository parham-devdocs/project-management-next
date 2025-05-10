"use client"
import { Task } from "@/database.types";
import supabase from "@/utils/databaseClient"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";
export default function Search() {
    const [searchTerm,setSearchTerm]=useState("")
    const [value] = useDebounce(searchTerm, 1000);
    const [loading,setLoading]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [tasks,setTasks]=useState<Task[] | null>(null)
    useEffect(()=>{
        if (value.trim()) {
            fetchData(value);
          }    },[value])
    async function fetchData(e) {
setSearchTerm(e)

        setLoading(true)
        const { data, error }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select(`*`)
                .eq("title",value.trim())
      
        if (error) {
            setLoading(false)
            setErrorMessage(error.message || "An unexpected error occurred");
            return;
        }
      
        if (!data || data.lenght === 0) {
            setLoading(false)
            setErrorMessage("No task available");
            setTasks(null);
            return;
        }
        setLoading(false)
        setTasks(data);
        console.log(data)
    }

    return (
<div className=" max-w-full flex  flex-col gap-8 px-10">

{!loading && errorMessage && <p>{errorMessage}</p>}
 <input type="search" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm}  className=" w-48 h-7 focus:ring-2 dark:text-white focus:ring-blue-300 focus:border-blue-600 rounded-md  px-4 border-2 border-gray-600 focus:outline-0"/>
{/* Tasks Row */}
{!loading && !errorMessage && tasks?.length ? (
    <div className="pb-4">
  <div className="flex flex-wrap md:flex-nowrap gap-4 min-h-[200px] overflow-x-auto scrollbar-hide">
    {tasks.map((task) => (
      <div
        key={task.id}
        className=" dark:bg-dark-secondary  shadow-lg hover:shadow-xl transition-shadow rounded-xl p-5 w-full sm:w-72 flex-shrink-0 border border-gray-100 dark:border-dark-tertiary"
      >
        <h3 className="font-bold text-xl text-gray-800 dark:text-dark-tertiary">{task.title}</h3>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{task.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-500">Status:</div>
          <div className="font-medium text-blue-600">{task.status}</div>

          {task.priority && (
            <>
              <div className="text-gray-500">Priority:</div>
              <div className="font-medium text-yellow-600">{task.priority}</div>
            </>
          )}

          {task.duedate && (
            <>
              <div className="text-gray-500">Due:</div>
              <div className="font-medium text-green-600">
                {new Date(task.duedate).toLocaleDateString()}
              </div>
            </>
          )}
        </div>

        {/* Optional badge */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            ID: {task.id}
          </span>
          <button className="text-xs text-indigo-600 hover:underline">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
) : !loading && !tasks?.length && (
  <p className="text-gray-500">No tasks found matching your search.</p>
)}
{loading && (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
  </div>
)}
</div>


)


}

