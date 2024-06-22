import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HOST } from '../app.constants';
import { AppEndpoints } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${HOST}${AppEndpoints.TASKS}`);
  }

  public getTaskByID(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(`${HOST}${AppEndpoints.TASKS}` + taskId);
  }

  public createTask(task: Task): Observable<Task> {
    return this.httpClient.post(`${HOST}${AppEndpoints.TASKS}`, task);
  }

  public editTask(taskId: string, task: Task): Observable<Task> {
    return this.httpClient.put(`${HOST}${AppEndpoints.TASKS}` + taskId, task);
  }

  public deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(`${HOST}${AppEndpoints.TASKS}` + taskId);
  }
}
