import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsDto } from '../model/Statistics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  

  private apiUrl = 'https://localhost:7058/api/Report/statistics'; // ضع رابط API هنا

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsDto> {
    return this.http.get<StatisticsDto>(this.apiUrl);
  }

}
