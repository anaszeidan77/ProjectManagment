import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsDto } from '../model/Statistics';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProjectStatisticsDto } from '../model/ProjectStatisticsDto';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  

  //private apiUrl = 'https://localhost:7058/api/Report/statistics'; // ضع رابط API هنا
  private apiUrl =  `${environment.url}/Report`;
  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsDto> {
    return this.http.get<StatisticsDto>(`${this.apiUrl}/statistics`);
  }


  getStatisticsByProject(id:string):Observable<ProjectStatisticsDto>{
    return this.http.get<ProjectStatisticsDto>(`${this.apiUrl}/project/${id}`);
  }

}
