import  { ReactNode } from "react"
import ReactDOM from "react-dom";
import Header from "./Header";
import { CrossIcon, LucideCross } from "lucide-react";
type Props={
children:ReactNode
isOpen:boolean
onClose:()=>void
name:string

}

export default function Modal({children,isOpen,onClose,name}:Props) {
    if (!isOpen) return null
    return ReactDOM.createPortal(
        <div className=" fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600/50">
            <div className=" w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary ">
                <Header name={name} isSmallText buttonComponent={<button className=" flex h-7 w-7  items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600 font-bold" onClick={onClose}>X</button>}/>
           {children}
            </div>
        </div>
        ,document.body
    )
}