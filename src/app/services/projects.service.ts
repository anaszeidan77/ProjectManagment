import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../model/project';
import { PaginatedResponse } from '../model/PaginatedResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private urll='https://localhost:7058/api/Projects';
  private apiUrl = `${environment.url}/Projects`;
  constructor(private http:HttpClient) { }


    getAll(pageNumber: number, pageSize: number):Observable<PaginatedResponse<Project>>{
      let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      return this.http.get<PaginatedResponse<Project>>(this.urll,{params});
    }
    
    addProject(project: FormData): Observable<any> {
 
      
      return this.http.post(this.urll, project);
    }
    delete(projectId: string): Observable<any> {
      
      return this.http.delete(`${this.urll}/${projectId}`);
  }
  updateProject(projectId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.urll}/${projectId}`, formData);
  }
  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.urll}/${projectId}`);
  }
  // getAll(pageNumber: number=1, pageSize: number=10): Observable<any> {

  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString());
  
   
  //   return this.http.get<any>(`${environment.url}/Projects`, { params }).pipe(
  //     map((p: any) => p.data)
  //   );
  // }
}
