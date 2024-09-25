import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
}) 
export class TaskService {
  private apiUrl = 'https://localhost:7058/api/Tasks';
  constructor(private http :HttpClient) { }
// <<<<<<< HEAD
 
//   getAllTask(): Observable<any[]> {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map((response: any) => response.data) // استخراج البيانات من الحقل data
// =======
  
  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)
    .pipe(
      map((respose : any)=>respose.data),
      catchError(this.handleError<Task[]>('getTasks',[]))

    );
  }
  
  getTasksById(id:string):Observable<Task>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url).
    pipe(
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.apiUrl,task,this.httpOptions)
    .pipe(
      catchError(this.handleError<Task>('addTask',))
    );
  }
  updateTask(id : string,task:Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Update URL:', url); // للتحقق
    console.log(task.taskId)
    return this.http.put(url, task, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }
  

  deleteTask(id?:string):Observable<Task>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url)
    .pipe(
      catchError(this.handleError<Task>('deleteTask'))
    )
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