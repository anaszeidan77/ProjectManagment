import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwt, login, register } from '../model/auth';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:7058/api/Auth";
  constructor(private http : HttpClient) { }
  
  login(login : login): Observable<jwt>{
    return this.http.post<jwt>(`${this.apiUrl}/Login`,login).pipe(
      tap(l=>console.log(l))
    )
  }
  logout(){
    localStorage.clear();
  }

  register(registerInfo : register ):Observable<jwt>{
    console.log(registerInfo)
    return this.http.post<jwt>(`${this.apiUrl}/register`,registerInfo);
  }

  refreshToken():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/refreshToken`)
  }

  revokeToken(token:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/revokeToken`,token)
  }

}