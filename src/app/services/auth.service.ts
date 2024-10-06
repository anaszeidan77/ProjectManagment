import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwt, login, register } from '../model/auth';
import { map, Observable, take, tap } from 'rxjs';
import { User } from '../model/user';
  
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = `${environment.url}/Auth`;
  constructor(private http : HttpClient) { }
  

  getAll():Observable<any>{


    return this.http.get(`${environment.url}/Auth/GetAllUsers`)
  }

  login(login : login): Observable<login>{
    return this.http.post<login>(`${this.apiUrl}/Login`,login).pipe(
      tap(l=>console.log(l))
    )
  }
  logout(){
    localStorage.clear();
  }

  // register(registerInfo : register ):Observable<jwt>{
  //   console.log(registerInfo)
  //   return this.http.post<register>(`${this.apiUrl}/register`,registerInfo);
  // }
  register(registerInfo: register): Observable<jwt> {
    console.log(registerInfo);
    return this.http.post<register>(`${this.apiUrl}/register`, registerInfo)
      .pipe(
        map((response: register) => {
          // Transform the register response to jwt
          const jwtResponse: jwt = {
                // Assuming 'register' contains a token
          };
          return jwtResponse;
        })
      );
  }
  
  refreshToken():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/refreshToken`)
  }

  revokeToken(token:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/revokeToken`,token)
  }

}