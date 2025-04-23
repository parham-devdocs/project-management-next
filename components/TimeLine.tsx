import { useState } from "react";
import { useSelector } from "react-redux";
import 'smart-webcomponents-react';
import { Accordion, AccordionItem } from 'smart-webcomponents-react/accordion';
type TaskTypeItems="task"|"milestone" | "project"


export default function TimeLine({ id, setIsModalOpen }: { id: string; setIsModalOpen: (open: boolean) => void }) {
    const isDarkMode=useSelector(state=>state)
7
const []=useState()
return(
    <div className=" mt-8">
         <Accordion>
			        <AccordionItem label="First Item">First Item Content.</AccordionItem>
			        <AccordionItem label="Second Item">Second Item Content.</AccordionItem>
			        <AccordionItem label="Third Item">Third Item Content.</AccordionItem>
			        <AccordionItem label="Fourth Item">Fourth Item Content.</AccordionItem>
			    </Accordion>
    </div>
)

}