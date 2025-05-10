import { Project } from "@/database.types";
import React from "react";

interface ProjectCardProps {
  project: Project;
}

// Helper to format date safely
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-md dark:bg-dark-tertiary bg-white hover:shadow-xl transition-shadow duration-300 transform  max-w-sm w-60">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">{project.name}</h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
        {project.description || "No description provided."}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-400">Start:</span>
          {formatDate(new Date(project.startDate).toString())}
        </p>
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-400">Due:</span>{" "}
          {formatDate(new Date(project.dueDate).toString())}
        </p>
      </div>

      {/* Optional badge/status */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          ID: {project.id}
        </span>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-500 hover:underline">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;