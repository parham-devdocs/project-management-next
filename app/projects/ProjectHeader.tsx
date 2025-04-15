import { useState } from "react";

 type Props = {
    activeTab:string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>; // Type of the setter function
  }

export default function ProjectHeader({activeTab,setActiveTab}:Props) {
  const [isModalNewProjectOpen,setIsModalNewProjectOpen]=useState(false)
    return (
      <div className=" px-4 xl:px-6">
        
      </div>
    )
}