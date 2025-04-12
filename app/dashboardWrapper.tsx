"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ReduxWrapper from "@/redux/ReduxWrapper";
import store, { initialStateTypes, setIsSidebarCollapsed } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function DashboardLayout({ children }: { children: ReactNode }) {
const isSidebarCollapsed=useSelector((state:initialStateTypes)=>state.isSidebarCollapsed)
const isDarkMode=useSelector((state:initialStateTypes)=>state.isDarkMode)
const dispatch=useDispatch()
const sidebarTogglerHandler=()=>{
    dispatch(setIsSidebarCollapsed(false))
    console.log(isSidebarCollapsed)
}
useEffect(() => {
    console.log("Sidebar collapsed:", isSidebarCollapsed);

    // Toggle dark mode class on the document element
    if (isDarkMode) {
        document.documentElement.classList.add("dark");
        console.log(document.documentElement.classList)
    } else {
        document.documentElement.classList.remove("dark");
        console.log(document.documentElement.classList)

    }
}, [isSidebarCollapsed, isDarkMode]); // Add dependencies here
    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            <Sidebar toggleSidebar={sidebarTogglerHandler}/>
            <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-0`}>
                <Navbar />
                {children}
            </main>
        </div>
    );
}

const DashboardWrapper = ({ children }: { children: ReactNode }) => (
    <ReduxWrapper>
        <DashboardLayout>{children}</DashboardLayout>
    </ReduxWrapper>
);

export default DashboardWrapper;