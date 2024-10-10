
export interface StatisticsDto {
    totalProjects: number;
    totalCompletedProjects: number;
    totalIncompleteProjects: number;
    projects: Array<{
      projectName: string;
      mainTasksCount: number;
      totalSubTasksCount: number;
    }>;
    teams: Array<{
      teamName: string;
      membersCount: number;
    }>;
  }
  