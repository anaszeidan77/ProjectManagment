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

  
  private apiUrl = `${environment.url}/Teams`;
  constructor(private http:HttpClient) { }

  getAll(pageNumber: number, pageSize: number,createBy:string): Observable<PaginatedResponse<Team>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      if(createBy){
        params = params.set('createBy', createBy);
      }
    return this.http.get<PaginatedResponse<Team>>(this.apiUrl, { params });
  }
  getTemaAll(pageNumber: number, pageSize: number): Observable<PaginatedResponse<Team>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    
    return this.http.get<PaginatedResponse<Team>>(this.apiUrl,{ params });
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
update(teamId: string, teamData: Team): Observable<Team> {
  console.log('data',teamData);
  
  return this.http.put<Team>(`${this.apiUrl}/${teamId}`, teamData);
}

  }

