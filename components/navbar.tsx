import { Search } from "lucide-react";


export default function Navbar() {
    return <div className=" flex items-center justify-between px-4 py-3 dark:bg-black ">
        <div className=" flex items-center gap-8">
            <div className=" relative flex h-min w-[200px] items-center ">
                <Search className=" absolute left-[4px] mr-2 h-5 w-5  transform cursor-pointer dark:text-white"/> 
                <input type="text" name="" id="" className=" w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder:text-gray-500 focus:border-transparent focus:outline-0 dark:bg-gray-700 dark:placeholder:text-white" />
            </div>
        </div>
        <div></div>
    </div>
}