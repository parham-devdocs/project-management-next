// Task.ts
enum Status{
    ToDo="To Do",
    WorkInProgress="Work In Progress",
    UnderReview="Under Review",
    Completed="Complete"
}
enum Priority{
    Urgent="Urgent",
    High="High",
    Medium="Medium",
    Low="Low",
    BackLog="BackLog"
}
export interface Task {
    id: number; // integer (int4)
    title: string; // text
    description?: string | null; // text (nullable)
    status?:Status ; // text
    priority?: Priority; // text
    tags?: string; // text
    startdate?: Date ; // timestamp with time zone (timestamptz, nullable)
    duedate?: Date ; // timestamp with time zone (timestamptz, nullable)
    points?: number; // integer (int4)
    projectid: number; // integer (int4)
    authoruserid: number; // integer (int4)
    assigneduserid: number; // integer (int4)
    author?:User
    assignee?:User
    comments?:Comment[]
    Attachment?:Attachment
  }

  export interface ProjectTeam{
    id:number
    teamId:number
    projectId:number
  }

  export interface User{
    userId:number
    cognitoId:string
    username:string
    profilepictureurl:string|null
    teamId:number
  }

  export interface Project{
    id:number
    name:string
    description:string|null
    startDate:Date
    dueDate:Date
  }

  export interface Team{
    id:number
    teamName:string
    productowneruserid:number
    projectmanageruserid:number
  }

  export interface TaskAssignment{
    id:number
    userId:number
    taskId:number
  }

  export interface Comment{
    id:number
    text:string
    taskId:number
    userID:number
  }

  export interface Attachment{
    id:number
    fileurl:string
    filename:string
    taskid:number
    uploadedByID:number
  }