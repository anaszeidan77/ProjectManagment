import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Task } from '../model/task';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../model/PaginatedResponse';

@Injectable({
  providedIn: 'root'
}) 
export class TaskService {
  private url='https://localhost:7058/api'
  private apiUrl = `${environment.url}/Tasks`;
  constructor(private http :HttpClient) { }




  getTasks(pageNumber: number, pageSize: number,createBy:string):Observable<PaginatedResponse<Task>>{
    let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

      if(createBy){
      params = params.set('CreatedBy', createBy);
    }
    return this.http.get<PaginatedResponse<Task>>(this.apiUrl, { params: params });

  }
  
  getTasksById(id:string):Observable<Task>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url).
    pipe(
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(`${environment.url}/Tasks`,task,this.httpOptions)
    .pipe(
      catchError(this.handleError<Task>('addTask',))
    );
  }
  updateTask(id : string,task:Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Update URL:', url); 
    console.log(task.taskId)
    return this.http.put(`${this.url}/Tasks/task/${id}`, task, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }
  

  
  delete(Id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${Id}`).pipe(
      catchError(err => {
        console.error('Error in delete method:', err);
        return throwError(err); 
      })
    );
  }

  getTaskByUserId(userId:string):Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/Tasks/${userId}`);
  }

  updateSubTask(subTaskId : string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${subTaskId}`,{subTaskId},{'responseType':'text' as 'json'})
  }

    // إعدادات HTTP
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // التعامل مع الأخطاء
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // يمكنك استبدال هذا بـ service لتسجيل الأخطاء
        return of(result as T);
      };
    }

}