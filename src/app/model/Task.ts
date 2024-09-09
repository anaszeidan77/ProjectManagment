import { SubTask } from "./SubTask";

export interface Task {
    taskId: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: number;
    priority: number;
    projectId: string;
    userId: string;
    createdBy: string;
    isDeleted: boolean;
    subTaskDtos: SubTask[];
  }