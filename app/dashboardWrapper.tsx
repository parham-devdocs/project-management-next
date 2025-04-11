import Navbar from "@/components/navbar";
import { ReactNode } from "react";


export default function DashboardWrapper({children}:{children:ReactNode}) {
    return(
<div className=" flex min-h-screen w-full bg-gray-50 text-gray-900">
    sidebar
    <main className={` flex flex-col bg-gray-50 dark:bg-dark-bg md:pl-64  `}>
        <Navbar/>
        {children}
    </main>
</div>
    )
}