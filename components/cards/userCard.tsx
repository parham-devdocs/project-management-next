import { User } from "@/database.types";
import Image from "next/image";
import React from "react";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="group flex flex-col  items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-dark-tertiary w-full max-w-sm ">
      {/* Avatar */}
      <div className="relative h-24 w-24 ">
        {user.profilepictureurl ? (
          <Image
            src={user.profilepictureurl}
            alt={`${user.username}'s profile picture`}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col min-w-0">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 truncate">
          {user.username}
        </h3>

        <div className="text-xs text-gray-500 mt-1 space-y-0.5">
          <p>
            <span className="font-medium text-gray-600 dark:text-gray-400">User ID:</span>{" "}
            <span className="text-gray-700 dark:text-gray-400">{user.userid}</span>
          </p>

          {user.teamid && (
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-400">Team ID:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{user.teamid}</span>
            </p>
          )}
        </div>
      </div>
      <button className="border border-indigo-600 px-4 py-1.5 text-indigo-600 text-sm font-medium rounded-md 
  transition-all duration-200 ease-in-out 
  hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-800 
  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 dark:text-indigo-300 dark:border-indigo-300">
  View Profile
</button>

     
    </div>
  );
};

export default UserCard;