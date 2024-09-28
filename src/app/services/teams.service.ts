import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Team } from '../model/team';
import { PaginatedResponse } from '../model/PaginatedResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  
  private apiUrl = 'https://localhost:7058/api/Teams';
  constructor(private http:HttpClient) { }

  getAll(pageNumber: number, pageSize: number): Observable<PaginatedResponse<Team>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Team>>(`${environment.url}/Teams`, { params });
  }

  getById(Id:string):Observable<Team>{

   return  this.http.get<Team>(`${this.apiUrl}/${Id}`)
  }

  addTeam(teamData: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, teamData);
  }
delete(teamId:string):Observable<Team>{
  return this.http.delete<Team>(`${this.apiUrl}/${teamId}`)
}
update(teamData: Team):Observable<Team>{
  return this.http.delete<Team>(this.apiUrl)
}
  }

  






// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { PaginatedResponse } from '../model/PaginatedResponse';
// import { Team } from '../model/team';

// @Injectable({
//   providedIn: 'root'
// })
// export class TeamsService {

//   private apiUrl = 'https://localhost:7058/api/Teams'; // الرابط الأساسي للـ API

//   constructor(private http: HttpClient) {}

//   /**
//    * جلب قائمة الفرق باستخدام pagination.
//    * @param pageNumber رقم الصفحة المطلوب
//    * @param pageSize حجم الصفحة (عدد العناصر في الصفحة)
//    * @returns Observable مع PaginatedResponse
//    */
 
// }
