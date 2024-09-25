import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { PaginatedResponse } from '../model/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrl='https://localhost:7058/api/Auth'

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`)
  }

  

  // getAll():Observable<PaginatedResponse<Project>>{
  //   return this.http.get<PaginatedResponse<Project>>(this.apiUrl)
  // }

 
}
