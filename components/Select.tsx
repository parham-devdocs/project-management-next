import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";

export default function SelectComponent({ name, data }: { name: string; data: string[] }) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  return (
      <select
        onClick={() => setSelectIsOpen(!selectIsOpen)}
        onBlur={() => setSelectIsOpen(false)}
        className="block font-bold px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        id={name}
        name={name}
      >
        <option value="" disabled defaultValue={"Select The Month"}>
          Select The Month
        </option>
        {data.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>


  );
}