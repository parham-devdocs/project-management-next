"use client"
import ProjectCard from "@/components/cards/projectCard";
import TaskCard from "@/components/cards/taskCard";
import UserCard from "@/components/cards/userCard";
import Hedaer from "@/components/Header";
import { Project, Task, User } from "@/database.types";
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
    const [projects,setProjects]=useState<Project[] | null>(null)
    const [users,setUsers]=useState<User[] | null>(null)

    useEffect(()=>{
        if (value.trim()) {
            fetchTasks(value);
            fetchProject(value)
            fetchUsers(value)
          }    },[value])
    async function fetchTasks(e) {
setSearchTerm(e)

        setLoading(true)
        const { data:taskDate, error:taskError }: { data: any | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select(`*`)
                .eq("title",value.trim())
        if (!taskDate || taskDate.lenght === 0) {
            setLoading(false)
            setErrorMessage("No task available");
            setTasks(null);
            return;
        }
        setLoading(false)
        setTasks(taskDate);
    }
    async function fetchProject(e) {
        setSearchTerm(e)
        
                setLoading(true)
                        const { data:projectData, error:projectError }: { data: any | null; error: PostgrestError | null } =
                        await supabase
                            .from("Project")
                            .select(`*`)
                            .eq("name",value.trim())
                  
             if (projectError) {
                
             }
             
              
                if (!projectData || projectData.lenght === 0) {
                    setLoading(false)
                    setErrorMessage("No task available");
                    setTasks(null);
                    return;
                }
                setLoading(false)
                setProjects(projectData)
            }
            async function fetchUsers(e) {
                setSearchTerm(e)
                
                        setLoading(true)
                        const { data:userData, error:userError }: { data: any | null; error: PostgrestError | null } =
                            await supabase
                                .from("User")
                                .select(`*`)
                                .eq("username",value.trim())
                        if (!userData || userData.lenght === 0) {
                            setLoading(false)
                            setErrorMessage("No task available");
                            setTasks(null);
                            return;
                        }
                        setLoading(false)
                        setUsers(userData);
                    }
    return (
<div className=" max-w-full flex  flex-col gap-8 px-10">

{!loading && errorMessage && <p>{errorMessage}</p>}
 <input type="search" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm}  className=" w-48 h-7 focus:ring-2 dark:text-white focus:ring-blue-300 focus:border-blue-600 rounded-md  px-4 border-2 border-gray-600 focus:outline-0"/>
    <div className="pb-4">
{tasks && tasks.length > 0 ? (
  <>
    <Hedaer name="Task" />
    {loading && (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    )}

    {/* Task Cards */}
    {!loading && (
      <div className="flex flex-wrap md:flex-nowrap gap-4 min-h-[200px] overflow-x-auto scrollbar-hide">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            authoruserid={task.authoruserid}
            assigneduserid={task.assigneduserid}
            priority={task.priority}
            startdate={task.startdate}
            status={task.status}
            id={task.id}
            title={task.title}
            description={task.description}
            projectid={task.projectid}
          />
        ))}
      </div>
    )}
  </>
) : null}
       
       {projects && projects.length > 0 ? (
  <>
    <Hedaer name="Projects" />
    {loading && (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    )}
    {!loading && (
      <div className="flex flex-wrap md:flex-nowrap gap-4 min-h-[200px] overflow-x-auto scrollbar-hide">
        {projects.map((project) => (
         <ProjectCard project={project}/>
        ))}
      </div>
    )}
  </>
) : null}
{users && users.length > 0 ? (
  <>
    <Hedaer name="User" />
    {loading && (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    )}

    {/* Task Cards */}
    {!loading && (
      <div className="flex flex-wrap md:flex-nowrap gap-4 min-h-[200px] overflow-x-auto scrollbar-hide">
        {users.map((user) => (
        <UserCard user={user}/>
        ))}
      </div>
    )}
  </>
) : null}
</div>

{loading && (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
  </div>
)}
</div>


)


}

