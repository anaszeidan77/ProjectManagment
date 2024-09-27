import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, register } from '../model/auth';
import { Observable, take, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:7058/api/Auth";
  constructor(private http : HttpClient) { }



  login(login : login): Observable<login>{
    return this.http.post<login>(`${this.apiUrl}/Login`,login).pipe(
      tap(l=>console.log(l))
    )
  }

  register(registerInfo : register ):Observable<register>{
    console.log(registerInfo)
    return this.http.post<register>(`${this.apiUrl}/register`,registerInfo);
  }


  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`)
  }
}