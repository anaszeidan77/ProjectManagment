import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl='http://projectm.runasp.net';
  constructor(private http: HttpClient) { }

  getAll():Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiUrl}/roles`)
  }

  addRole(role :Role):Observable<Role>{
    return this.http.post<Role>(`${this.apiUrl}/add`,role);
  }

  ManagePermissions(id : string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/manage-permissions/${id}`)
  }

  updatePermissions(data: any) {
    return this.http.post(`${this.apiUrl}/manage-permissions`, data);
  }

}
