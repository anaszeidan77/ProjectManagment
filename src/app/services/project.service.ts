import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) {}

  private apiUrl='https://localhost:7058/api/Projects';
 // map((respose : any)=>respose.data),

  getAll():Observable<any>{
    return this.http.get<any>(this.apiUrl).pipe(
      map((p:any)=>p.data)
    );
  }
}
