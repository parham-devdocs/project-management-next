"use client"
import { DataGrid ,GridColDef } from '@mui/x-data-grid';
import { User } from "@/database.types";
import supabase from '@/utils/databaseClient';
import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import Hedaer from '@/components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default  function Users() {
   const [errorMessage,setErrorMessage]=useState<PostgrestError | null>(null )
   const [isLoading,setIsLoading] =useState(false)
   const [users,setUsers]=useState<User[] |null>(null)
   const isDarkMode=useSelector((state:any)=>{ return state.isDarkMode}) 
   const darkModeTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
   async function fetchData() {
setIsLoading(true)
    const { data, error } = await supabase
    .from('User')
    .select('*');
    if (error) {
        setErrorMessage(error)
    }
    setUsers(data)
    setIsLoading(false)

    }
    useEffect(()=>{
       fetchData()

    },[])
    const columns: GridColDef<( User[])[number]>[] = [
        {
            field: 'userid',
            headerName: 'ID',
            width: 150,
           
          },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
          
        },
        {
            field: 'profilepictureurl',
            headerName: 'Profile Picture',
            width: 75,
            renderCell:(row)=>{
              console.log(row.row.profilepictureurl)
             return <div className=' flex justify-center items-center w-full'>
                <Image src={row.row.profilepictureurl || "https://avatar.iran.liara.run/public/12"} alt={row.row.username} width={50} height={50} unoptimized/>
              </div>
            }
                  },
        
           {
            field: 'teamid',
            headerName: 'Team Id',
            width: 30,
          },
    ]
    
      if ( isLoading) {
      return  <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    
      } 
      if (errorMessage) {
        return <p className=' mt-48 block text-center text-red-800'>{errorMessage.message}</p>
      }
    return <div className='flex flex-col w-full p-8'>
<Hedaer name='Users'/>



// Inside your component
<ThemeProvider theme={darkModeTheme}>
  <DataGrid
    rows={users ?? []}
    columns={columns}
    getRowId={(row) => row.userid}
    initialState={{
      pagination: {
        paginationModel: { pageSize: 5 },
      },
    }}
    pageSizeOptions={[5]}
    checkboxSelection
    disableRowSelectionOnClick
    sx={{
      backgroundColor: isDarkMode ? '#121212' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    
      // Remove border from root
      '& .MuiDataGrid-root': {
        border: 'none',
      },
    
      // Entire header row container
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#000',
        borderBottom: 'none',
      },
    
      // Individual header cell (important!)
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#000',
        width:"100%"
      },
    
      // Header title text
      '& .MuiDataGrid-columnHeaderTitle': {
        color: isDarkMode ? '#fff' : '#000',
        fontWeight: 'bold',
      },
    
      // Row cells
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${isDarkMode ? '#333' : '#ccc'}`,
      },
    
      // Footer pagination
      '& .MuiDataGrid-footerContainer': {
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#000',
      },
    }}
  />
</ThemeProvider>

    </div>
}