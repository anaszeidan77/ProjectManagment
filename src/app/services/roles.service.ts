import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { test } from '../model/test/test';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl="http://taskofmanaginglibrary.runasp.net/api/MainCategoriesFromEF";
  constructor(private http:HttpClient) { }

  getAllRoles():Observable<test[]>{
    return this.http.get<test[]>(this.apiUrl);
  }
}
