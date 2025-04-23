"use client";
import { Attachment, Task as TaskType, User } from "@/database.types";
import supabase from "@/utils/databaseClient";
import { PostgrestError } from "@supabase/supabase-js";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {DndContext,useDroppable,useDraggable} from '@dnd-kit/core';
import { format } from "date-fns";
import Image from "next/image";
const baseStyle = "inline-block px-3 py-1 text-sm font-bold rounded-full mr-2";
export default function TaskPage({ id, setIsModalOpen }: { id: string; setIsModalOpen: (open: boolean) => void }) {
    const [task, setTask] = useState<TaskType[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
const taskStatus=["Not Started","In Progress","Under Review" , "Completed"]
async function fetchData() {
  const { data: tasks, error }: { data: any | null; error: PostgrestError | null } =
      await supabase
          .from("Task")
          .select(`id,description,status,title,priority,tags,startdate,duedate,points,assignee(profilepictureurl,username,userid),author(username,userid,profilepictureurl),projectid,Attachment!Task_attachments_fkey(filename,fileurl),authoruserid(userid,username,profilepictureurl)`)
          .eq("id", id);

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
 
    async function moveTask({ id, status }: { id: number; status: string }) {
        try {
          const { error } = await supabase
            .from("Task")
            .update({ status })
            .eq("id", id);
    
          if (error) {
            console.error("Error updating task status:", error);
          } else {
            fetchData();
          }
        } catch (err) {
          console.error("Error moving task:", err);
        }
      }
    useEffect(() => {
        fetchData();

    }, [id]);

    return (
        <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {task ? (
                <div>
<DndContext    onDragEnd={(event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Extract the task ID and new status from the IDs
      const taskId = parseInt(active.id.split("-")[1], 10);
      const newStatus = over.id.split("-")[1] 


      moveTask({ id: taskId, status: newStatus });
    } else {
      console.log(`Drag ended without dropping`);
    }
  }}>
<div className=" grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
    {taskStatus.map(status=><TaskColumn  key={status} status={status} tasks={task} moveTask={()=>moveTask} setIsModalNewTaskOpen={setIsModalOpen} />)}
</div>
</DndContext>
   

                </div>
            ) : (
                <p>Loading task...</p>
            )}
        </div>
    );
}
type TaskColumnProps={
    status:string
    tasks:TaskType[]
    moveTask:(taskId:number,toStatus:string)=>void
    setIsModalNewTaskOpen:(isOpen:boolean)=>void
}

function TaskColumn({status,tasks,moveTask,setIsModalNewTaskOpen}:TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({id: `column-${status}`,  data: { columnStatus: status },   });    
    const statusCount=tasks.filter((task)=>task.status===status).length
      const statusColor:any={"To Do":"#2563EB","Work In Progress":"#059669","Under Review":"#D97706","Completed":"#000000"}
    return (
        <div className={` sm:py-4 rounded-lg py-2 xl:px-2   dark:bg-neutral-950 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`} ref={setNodeRef}>
            <div className=" mb-3 flex w-full">
                <div className={` w-2  rounded-s-lg`} style={{backgroundColor:statusColor[status]}}/>
                <div className=" flex w-full items-center justify-between  rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className=" flex items-center text-lg font-semibold dark:text-white">{status}<span className=" bg-gray-200 font-semibold inline-block p-1 ml-2 mb-1 dark:bg-dark-tertiary dark:text-white  leading-none text-center rounded-full w-4 h-4 text-sm">{statusCount}</span> </h3>
                 <div className=" flex items-center gap-1">
                 <button className=" w-6 h-6 dark:bg-neutral-500 flex items-center justify-center rounded-full cursor-pointer"><EllipsisVertical size={26}/></button>
                 <button className=" flex h-6 w-6 items-center cursor-pointer justify-center rounded-full bg-gray-200 dark:bg-dark-tertiary dark:text-white" onClick={()=>setIsModalNewTaskOpen(true)}><Plus size={16}/></button>
                 </div>
     
                </div>
            </div>
            {tasks.filter(task => task.status === status).map(t => {
    return (
        <Task
            key={t.id}
            task={t}
            
        />
    );
})}
        </div>
    )
}



const PriorityTag = ({ priority }:any ) => {
  const getPriorityStyle = (priority: any) => {
    switch (priority) {
      case "urgent":
        return `bg-red-200 text-red-700  ${baseStyle}`;
      case "High":
        console.log("high")
        return `bg-yellow-200 text-yellow-700  ${baseStyle}`;
      case "Medium":
        return `bg-green-200 text-green-700 ${baseStyle} `;
      case "Low":
        return `bg-blue-200 text-blue-700  ${baseStyle}`;
      default:
        return "";
    }
  };

  if (!priority) {
    return null;
  }

  return (
    <div className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityStyle(priority)}`}>
      {priority}
    </div>
  );
};

const Task = ({ task }: { task: TaskType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `task-${task.id}`, 
    data: { taskId: task.id }, 
  });

    const taskSplit = task.tags ? task.tags.split(",") : [];
    const formattedStartDate = task.startdate ? format(new Date(task.startdate), "yyyy-MM-dd") : "";
    const formattedDueDate = task.duedate ? format(new Date(task.duedate), "yyyy-MM-dd") : "";
    const numberOfComments = task.comments?.length || 0;
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <div
        ref={setNodeRef}
        {...listeners} {...attributes}
            className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary `}
            style={style}
        >
            {/* Render attachments */}
            {task.Attachment  && (
    <Image
        src={task.Attachment?.fileurl || "https://avatar.iran.liara.run/public/45"}
        alt={task.Attachment?.filename || "Attachment"}
        width={400}
        height={200}
        className="h-auto w-full md:w-1/4 rounded-t-md"
    />
)}

            {/* Task details */}
            <div className="p-4 space-y-2.5 ">
                <div className="flex gap-2 items-center w-full py-3 px-3 bg-white shadow dark:bg-dark-secondary">
  {task.priority && <PriorityTag priority={task.priority} />}
  <div className="flex items-center gap-2 flex-wrap">
    {taskSplit.length > 0 ? (
      taskSplit.map((tag) => (
        <p key={tag} className={`${baseStyle} bg-blue-100 text-blue-700`}>{tag} </p>
      ))
    ) : (
      "No tags"
    )}
  </div>

 
  <button className="flex h-6 w-4 shrink-0 items-center justify-center dark:text-neutral-500 ml-auto">
    <EllipsisVertical />
  </button>
</div >
<div className="my-3 flex justify-between">
    <h4 className=" text-[15px] font-bold dark:text-white">{task.title}</h4>
    {typeof task.points === "number" && (
        <div className=" text-[12px] font-semibold dark:text-white">{task.points} pts</div>
    )}
</div>
<div className=" text-[18px] text-gray-500 dark:text-neutral-500">
{formattedStartDate && <span>{formattedStartDate} -</span>}
{formattedDueDate && <span>{formattedDueDate}</span>}

</div>
<p className=" text-sm text-gray-600 dark:text-neutral-500">{task.description}</p>
<div className=" mt-4 border-t border-gray-200 dark:border-stroke-dark"/>
<div className="mt-3 flex items-center justify-between">
  <div className=" flex -space-x-[6px] overflow-hidden">
    {task.assignee && (
      <Image key={task.assignee.userId} alt={task.assignee.username} width={30} height={30} src={task.assignee.profilepictureurl || "https://avatar.iran.liara.run/public/35"} className=" h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-bg"/>
    )}
     {task.author && (
      <Image key={task.author.userId} alt={task.author.username} width={30} height={30} src={task.author.profilepictureurl || "https://avatar.iran.liara.run/public/31"} className=" h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-bg"/>
    )}
  </div>
  <div className=" flex items-center text-gray-500 dark:text-neutral-500">
    <MessageSquareMore size={20}/>
    <span className=" ml-1 text-sm dark:text-neutral-400">
      {numberOfComments}
    </span>
  </div>
</div>
            
            </div>
        </div>
    );
};