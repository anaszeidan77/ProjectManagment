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

  private apiUrl = `${environment.url}/Projects`;
  constructor(private http:HttpClient) { }


    getAll(pageNumber: number, pageSize: number):Observable<PaginatedResponse<Project>>{
      let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      return this.http.get<PaginatedResponse<Project>>(this.apiUrl,{params});
    }

    addProject(project:Project):Observable<Project>{
      return this.http.post<Project>(this.apiUrl,project);
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
