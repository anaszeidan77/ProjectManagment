export interface SubTask {
    subTaskId: string;
    subTaskName: string;
    description: string;
    subTaskProgressPercentage: number;
    isCompleted: boolean;
    taskId: string;
  }