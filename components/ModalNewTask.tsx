import { useState } from "react";
import Modal from "./Modal";
import supabase from "@/utils/databaseClient";
import { ToastContainer, toast } from 'react-toastify';
import { Priority, Status } from "@/database.types";

type Props={
    isOpen:boolean
    onclose:()=>void
}

export default function ModalNewTask({isOpen,onclose}:Props) {
    const [taskName,setTaskName]=useState("")
    const [description,setDescription]=useState("")
    const [status,setStatus]=useState<Status>(Status.ToDo)
    const [priority,setPriority]=useState<Priority>(Priority.BackLog)
    const [tags,setTags]=useState("")
    const [startdate,setStartdate]=useState("")
    const [duedate,setDuedate]=useState("")
    const [authorUserid,setAuthorUserid]=useState("")
    const [assignedUserid,setAssignedUserid]=useState("")

    const [errorMessage,setErrorMMessage]=useState("")
    const notifyError = () => toast("something is wrong");
    const notifySuccess = () => toast("successfully admitted");
  
  async  function handleSubmit() {
        if (!taskName) return 
        console.log("why twice ?")
    const {error,data}=  await  supabase.from("Task").upsert([{title:taskName,description,startdate,duedate,priority,tags,authoruserid:parseInt(authorUserid),assigneduserid:parseInt(assignedUserid)}])
    
    if (error) {
        setErrorMMessage(error.message)
        console.log(errorMessage)
        notifyError()
       return 
    }
    onclose()
    notifySuccess()
    setTaskName("")
    setTags("")
    setStartdate("")
    setDuedate("")
    setAuthorUserid("")
setAssignedUserid("")
    }
    const selectStyle=` w-full block w-full  rounded border border-gray-300 px-3 py-2  shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`

    const inputStyle=` w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`
const formISValid=()=>{
    return taskName
}
    return( <>
     <Modal isOpen={isOpen} onClose={()=>{onclose} } name="Create New Task"   >
        <form className=" mt-4 space-y-6" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
            <input type="text" className={inputStyle} placeholder={"title"} value={taskName} onChange={(e)=>setTaskName(e.target.value)} />
            <textarea  className={inputStyle} placeholder={"description"} value={description} onChange={(e)=>setDescription(e.target.value)} />
            <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
         <select className={selectStyle} value={status} onChange={(e)=>setStatus(Status[e.target.value as keyof typeof Status])}>
<option value="">Select Status</option>
<option value={Status.ToDo}>To Do</option>
<option value={Status.Completed}>Completed</option>
<option value={Status.UnderReview}>Under Review</option>
<option value={Status.WorkInProgress}>Work In Progress</option>
</select>
<select className={selectStyle} value={priority} onChange={(e)=>setPriority(Priority[e.target.value as keyof typeof Priority])}>
<option value="">Select Priority</option>
<option value={Priority.BackLog}>BackLog</option>
<option value={Priority.Urgent}>Urgent</option>
<option value={Priority.High}>High</option>
<option value={Priority.Medium}>Medium</option>
<option value={Priority.Low}>Low</option>

</select>
            </div>   
            <input type="text" className={inputStyle} placeholder={"tags (comma seperated)"} value={tags} onChange={(e)=>setTags(e.target.value)} />

         <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
         <input type="date" className={inputStyle} placeholder={"start date"} value={startdate} onChange={(e)=>setStartdate(e.target.value)} />
         <input type="date" className={inputStyle} placeholder={"due date"} value={duedate} onChange={(e)=>setDuedate(e.target.value)} />
            </div> 
            <input type="text" className={inputStyle} placeholder={"author user id"} value={authorUserid} onChange={(e)=>setAuthorUserid(e.target.value)} />
            <input type="text" className={inputStyle} placeholder={"assigned user id"} value={assignedUserid} onChange={(e)=>setAssignedUserid(e.target.value)} />

            <button type="submit" className={` mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-0 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!formISValid ? " cursor-not-allowed opacity-50" : ""}`}> submit </button>


        </form>
     </Modal>
     <ToastContainer />
    </>
   

)
}