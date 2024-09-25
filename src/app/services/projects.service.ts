import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { PaginatedResponse } from '../model/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl='https://localhost:7058/api/Projects'
  constructor(private http:HttpClient) { }


  getAll():Observable<PaginatedResponse<Project>>{
    return this.http.get<PaginatedResponse<Project>>(this.apiUrl)
  }

 
}
