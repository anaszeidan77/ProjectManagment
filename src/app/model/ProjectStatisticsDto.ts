export interface ProjectStatisticsDto {
    projectName: string;
    totalTeams: number; 
    teams: Array<{
      teamName: string;
      membersCount: number; 
    }>;
    totalMainTasks: number;
    totalSubTasks: number;
    taskCompletionStats: {
      completedMainTasks: number; 
      incompleteMainTasks: number; 
      completedSubTasks: number;
      incompleteSubTasks: number;
    };
  }
  