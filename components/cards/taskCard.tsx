import { Task } from "@/database.types";


export default function TaskCard({id,title,description,duedate,status,priority}:Task) {
    
    return (
        <div
        key={id}
        className=" dark:bg-dark-secondary  shadow-lg hover:shadow-xl transition-shadow rounded-xl p-5 w-full sm:w-72 flex-shrink-0 border border-gray-100 dark:border-dark-tertiary"
      >
        <h3 className="font-bold text-xl text-gray-800 dark:text-white">{title}</h3>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-500">Status:</div>
          <div className="font-medium text-blue-600">{status}</div>

          {priority && (
            <>
              <div className="text-gray-500">Priority:</div>
              <div className="font-medium text-yellow-600">{priority}</div>
            </>
          )}

          {duedate && (
            <>
              <div className="text-gray-500">Due:</div>
              <div className="font-medium text-green-600">
                {new Date(duedate).toLocaleDateString()}
              </div>
            </>
          )}
        </div>

        {/* Optional badge */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            ID: {id}
          </span>
          <button className="text-xs text-indigo-600 hover:underline">
            View Details
          </button>
        </div>
      </div>
    )
}