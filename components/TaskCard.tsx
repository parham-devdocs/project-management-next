import { Task } from "@/database.types"
import { format } from "date-fns";
import Image from "next/image";
type Props={
    task:Task
}

export default function TaskCard({task}:Props) {
   return <div className=" mb-3 bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
        {task.Attachment && (<div>
        
            <Image src={task.Attachment.fileurl} alt={task.Attachment.filename} width={400} height={200} className=" rounded-md"/>
        </div>)}
        <p><strong>ID:</strong>{task.id}</p>
        <p><strong>Title:</strong>{task.title}</p>
        <p><strong>Descriprion:</strong>{ task.description ||"No Description"}</p>
        <p><strong>Status:{task.status}</strong></p>
        <p><strong>Priority:</strong>{task.priority}</p>
        <p><strong>Tags:</strong>{task.tags  || " No Tags"}</p>
        <p> <strong>Start Date:</strong> {task.startdate ? format(new Date(task.startdate), "yyyy-MM-dd") : "Not Set"}</p> 
        <p> <strong>Due Date:</strong> {task.duedate ? format(new Date(task.duedate), "yyyy-MM-dd") : "Not Set"}</p> 
        <p><strong>Author:</strong>{task.author?.username  || " No Tags"}</p>
        <p><strong>Assignee:</strong>{task.assignee?.username  || "Unassigned"}</p>



         </div>
}