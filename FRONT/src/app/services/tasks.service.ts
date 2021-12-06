import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tasks } from '../main-container/models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseURL: string = 'http://localhost:5000';
  
  constructor(private http: HttpClient) { }

  login(body: {}){
    return this.http.post<string>(`${this.baseURL}/login`, body);
  };

  getTasks(token: string){
    return this.http.get<tasks[]>(`${this.baseURL}/cards`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'json',
        'ContentType': 'json'
      })
    });
  };

  addTask(token: string, body: {}){
    return this.http.post<tasks>(`${this.baseURL}/cards`, body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'json',
        'ContentType': 'json'
      })
    });
  };

  changeTask(token: string, body: tasks){
    return this.http.put<tasks>(`${this.baseURL}/cards/${body.id}`, body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'json',
        'ContentType': 'json'
      }),
    })
  };

  deleteTask(token: string, id: string){
    return this.http.delete<tasks[]>(`${this.baseURL}/cards/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'json',
        'ContentType': 'json'
      })
    });
  };

}
