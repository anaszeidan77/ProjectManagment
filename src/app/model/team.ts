import { TeamMember } from "./TeamMember";

// export interface Team {
//     teamId?: string;  
//     teamName?: string;  
//     projectId?: string;  
//     createdBy?: string;  
//     createdAt?: string;  
//     isDeleted?: boolean; 
//     teamMembers?: TeamMember[];  
//   }

  export interface Team {
    teamId?: string;
    teamName: string;
    description: string;
    projectId: string;
    createdBy: string;
    createdAt?: string;
    isDeleted?: boolean;
    teamMembers: TeamMember[];
  }