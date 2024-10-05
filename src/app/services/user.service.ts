import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7058/api/Auth/getAllUsers';
  private manageRolesUrl = 'https://localhost:7058/api/Auth/ManageRoles';
  private UpdateRolesUrl = 'https://localhost:7058/api/Auth/UpdateRoles';

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
