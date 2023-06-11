import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../models/todo";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.apiURL}/todos`)
  }

  getTodo(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.apiURL}/todos/${id}`);
  }
}
