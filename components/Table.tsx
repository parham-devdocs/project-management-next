import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Task, Task as TaskType } from "../database.types";
import { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/utils/databaseClient";
import { DataGrid, GridColDef, GridValueFormatter } from '@mui/x-data-grid';
import Hedaer from "./Header";
import { format, parseISO } from "date-fns";
import { dataGridSxStyles } from "@/app/lib/utils";
export default function Table({ id, setIsModalOpen }: { id: string; setIsModalOpen: (open: boolean) => void }) {
    const [task, setTask] = useState<TaskType[] >([]);
    const [errorMessage,setErrorMessage]=useState<PostgrestError | string>()
    const isDarkMode=useSelector((state:any)=>{ return state.isDarkMode }) 
    const [loading, setLoading] = useState<boolean>(false);
    const columns: GridColDef<(typeof task)[number]>[] = [
        { field: 'title', headerName: 'Title', width: 90 },
        {
          field: 'description',
          headerName: 'Description',
          width: 200,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 75,
          editable: true,
          align:"center",
          renderCell:(params)=>{
            const status = params.row.status as string

            let color =""
                switch (status) {
      case "Completed":
        color = "#28a745"; // Strong green
        break;
      case "In Progress":
        color = "#ffc107"; // Bright amber
        break;
      case "Under Review":
        color = "#17a2b8"; // Bold cyan-blue
        break;
      case "To Do":
        color = "#dc3545"; // Intense red
        break;
      default:
        color = "#6c757d"; // Gray for unknown status
    }
            return (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingLeft: 10,
                  color:color,
                  fontWeight: "bold",
                  borderRadius: 4,
                }}
              >
                {status || "N/A"}
              </div>
            );
          }
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 75,
            editable: true,
          },
          {
            field: 'tags',
            headerName: 'Tags',
            width: 130,
            editable: true,
          },
          {
            field: 'startdate',
            headerName: 'Start Date',
            width: 130,
            editable: true,
          valueGetter:(value)=>{  return format(parseISO(value),"MM-dd-yy")}
          },
          {
            field: 'duedate',
            headerName:'Due Date',
            width: 130,
            editable: true,
            valueGetter:(value)=>{  return format(parseISO(value),"MM-dd-yy")}
        },
        {
            field: 'author',
            headerName:'Author',
            width: 150,
            editable: true,
            renderCell:(params)=>{ return params.row.authoruserid.username ||"Unknown" }

        },
        {
          field: 'assignee',
          headerName:'Assignee',
          width: 130,
          editable: true,
          renderCell:(params)=>{ return params.row.assigneduserid.username ||"Unassigned" }

      },
      ];
    async function fetchData() {
        setLoading(true)
        const { data: tasks, error }: { data: any[] | null; error: PostgrestError | null } =
            await supabase
                .from("Task")
                .select("id, title, authoruserid(username),assigneduserid(username),startdate,duedate,description,tags,priority,status")
                .eq("projectid", id);
      
        if (error) {
            setLoading(false)
            setErrorMessage(error.message || "An unexpected error occurred");
            return;
        }
      
        if (!tasks || tasks.length === 0) {
            setLoading(false)
            setErrorMessage("No task available");
            setTask([]);
            return;
        }
        setLoading(false)
        setTask(tasks);
        console.log(tasks)
    }
      useEffect(()=>{
        fetchData()

      },[])
      
    return     <div className="mt-8 px-9 h-screen flex flex-col gap-5">
    <div className=" flex items-center justify-between ">
      <p className="font-bold text-2xl dark:text-white text-dark-bg">
        Project Task Timeline
      </p>
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
    
    
      {!errorMessage && task && task.length === 0 && (
        <p className="text-red-700 font-semibold text-3xl text-center mt-40">
          No tasks available
        </p>
      )}
  
      {/* Gantt Chart */}
      {!errorMessage && task && task.length > 0 && (
        <div className=" h-[540px] w-full px-4 pb-6 xl:px-6">
            <div className=" pt-5">
                <Hedaer name="Table"/>
            </div>
            <DataGrid
            loading={loading}
       rows={task || []}
       sx={{
        ...dataGridSxStyles(isDarkMode),
      }}
              columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
           
         
        
        </div>
      
      )}
    </div> 
}