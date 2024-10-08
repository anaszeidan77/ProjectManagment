import { Task } from "./task";
import { Team } from "./team";

export interface Project{
    projectId?:string;
    projectName:string;
    description:string;
    startDate:Date;
    endDate:Date;
    budget:number;
    totalProgressPercentageProject?:number;
    status:number;
    createdBy:string;
    createdAt:Date;
    isDeleted:boolean;
    documents: Document[];
    resources: Resource[];
    tasks?: Task[];
    teams?: Team[];
}
  
  export interface Document {
    documentId: string;
    documentName: string;
    type: number;
    documentURL: string;
    uploadedDate: string;
    createdBy: string;
    createdAt: string;
    isDeleted: boolean;
  }
  
  export interface Resource {
    
  }