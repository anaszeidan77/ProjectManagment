import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../model/project';
import { PaginatedResponse } from '../model/PaginatedResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl='https://localhost:7058/api/Projects'
  constructor(private http:HttpClient) { }


  getAll():Observable<PaginatedResponse<Project>>{
    return this.http.get<PaginatedResponse<Project>>(`${environment.url}/Projects`).pipe(
      map((respose : any)=>respose.data),
    );
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
