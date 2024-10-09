export interface SubTask {
  subTaskId: string;
  subTaskName: string;
  description: string;
  subTaskProgressPercentage: number;
  isCompleted: boolean;
  taskId: string;
}
  
  export interface Task {
    taskId?: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: number;
    priority: number;
    isCompleted?: boolean;
    projectId: string;
    userId: string;
    createdBy: string;
    isDeleted: boolean;
    subTaskDtos: SubTask[];
  }
  