import { Task } from "./task";
import { Team } from "./team";

export interface Project{
    projectId:string;
    projectName:string;
    description:string;
    startDate:Date;
    endDate:Date;
    budget:number;
    status:number;
    createdBy:string;
    createdAt:Date;
    isDeleted:boolean;
    documents: Document[];
    resources: any[];
    tasks: Task[];
    teams: Team[];
}