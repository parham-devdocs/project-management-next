import {  useState } from "react";
import Modal from "./Modal";
import supabase from "@/utils/databaseClient";
import { ToastContainer, toast } from 'react-toastify';


type Props={
    isOpen:boolean
    onclose:()=>void
}

export default function ModalNewProject({isOpen,onclose}:Props) {
    const [projectName,setProjectName]=useState("")
    const [description,setDescription]=useState("")
    const [startdate,setStartDate]=useState("")
    const [enddate,setEndDate]=useState("")
    const [errorMessage,setErrorMMessage]=useState("")
    const notifyError = () => toast("something is wrong");
    const notifySuccess = () => toast("successfully admitted");

  async  function handleSubmit() {
        if (!projectName|| !description || !startdate) return 
    const {error,data}=  await  supabase.from("Project").upsert([{name:projectName,description,startdate,enddate}])
    
    if (error) {
        setErrorMMessage(error.message)
        console.log(errorMessage)
        notifyError()
       return 
    }
    onclose()
    notifySuccess()

    }
    const inputStyle=` w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`
const formISValid=()=>{
    return projectName && description && startdate && enddate
}
    return( <>
     <Modal isOpen={isOpen} onClose={()=>{onclose} } name="Create New Project"   >
        <form className=" mt-4 space-y-6" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
            <input type="text" className={inputStyle} placeholder={projectName} value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
            <textarea  className={inputStyle} placeholder={description} value={description} onChange={(e)=>setDescription(e.target.value)} />
         <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
         <input type="date" className={inputStyle} placeholder={startdate} value={startdate} onChange={(e)=>setStartDate(e.target.value)} />
         <input type="date" className={inputStyle} placeholder={enddate} value={enddate} onChange={(e)=>setEndDate(e.target.value)} />
            </div>   
            <button  type="submit" className={` mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-0 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!formISValid ? " cursor-not-allowed opacity-50" : ""}`}>submit </button>


        </form>
     </Modal>
     <ToastContainer />
    </>
   

)
}