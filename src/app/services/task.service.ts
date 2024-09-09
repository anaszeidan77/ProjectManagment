import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../model/Task';
import { ResponseData } from '../model/ResponseData';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7058/api/Tasks';

  constructor(private http: HttpClient) {}


  getTasks(pageNumber: number, pageSize: number): Observable<(string | number | boolean)[][]> {
    return this.http.get<ResponseData<Task>>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(
        map(response => {

          return response.data.map(task => [task.taskName, task.description, task.dueDate, task.priority, task.status]);
        })
      );
  }
}
