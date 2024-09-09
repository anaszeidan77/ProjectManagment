// "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// "projectName": "string",
// "description": "string",
// "startDate": "2024-09-09T10:52:11.611Z",
// "endDate": "2024-09-09T10:52:11.611Z",
// "budget": 0,
// "status": 0,
// "createdBy": "string",
// "createdAt": "2024-09-09T10:52:11.611Z",
// "isDeleted": true,
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
}