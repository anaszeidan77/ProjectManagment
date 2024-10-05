import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.url}/Auth/getAllUsers`;
  private manageRolesUrl = `${environment.url}/Auth/ManageRoles`;
  private UpdateRolesUrl = `${environment.url}/Auth/UpdateRoles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // جلب الأدوار الخاصة بالمستخدم
  manageRole(userId: string): Observable<any> {
    return this.http.get(`${this.manageRolesUrl}/${userId}`);
  }

  updateRoles(user: User, roles: any[]): Observable<any> { 
    const payload = {
      userId: user.id, // تأكد من أن `id` هي الخاصية الصحيحة
      userName: user.userName, // تأكد من أن `userName` هي الخاصية الصحيحة
      roles: roles.map(role => ({
        displayValue: role.displayValue,
        isSelected: role.isSelected
      }))
    };
    
    return this.http.post(`${this.UpdateRolesUrl}`, payload);
  }
}
