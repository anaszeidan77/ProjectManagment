import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwt, login, register } from '../model/auth';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  //http://projectm.runasp.net/api
  private apiUrl = `${environment.url}/Auth`;
  constructor(private http : HttpClient) { }
  
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // التحقق من وجود token في localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAll():Observable<any>{
    return this.http.get(`${environment.url}/Auth/GetAllUsers`)
  }

  login(login : login): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Login`,login).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
)
  }
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
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

//https://localhost:7058/api/Auth/refreshToken
  refreshToken(): Observable<any> {
    return this.http.get<any>(`https://localhost:7058/api/Auth/refreshToken`).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  revokeToken(token:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/revokeToken`,token)
  }

}