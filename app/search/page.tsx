"use client"
import { Task as TaskType } from "@/database.types"
import supabase from "@/utils/databaseClient"
import { PostgrestError } from "@supabase/supabase-js"
import { useState } from "react"


export default function Search() {
    const [searchTerm,setSearchTerm]=useState("")
    const [loading,setLoading]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [tasks,setTasks]=useState(null)
    async function fetchData(e) {
setSearchTerm(e)

        setLoading(true)
        const { data, error }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select(`*`)
                .eq("title",searchTerm)
      
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
<div className=" max-w-full flex flex-col gap-8">
    <input type="search" onChange={(e)=>{fetchData(e.target.value)}} value={searchTerm} />
</div>
    )
}