import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

export interface Todo {
  addedDate: string
  id: string
  order: number
  title: string
}

export interface BaseResponse<T = {}> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  baseURL = environment.baseURL

  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': environment.apiKey,
    },
  }

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseURL}/todo-lists`, this.httpOptions)
  }

  createTodo(title: string): Observable<BaseResponse<{ item: Todo }>> {
    return this.http.post<BaseResponse<{ item: Todo }>>(
      `${this.baseURL}/todo-lists`,
      { title },
      this.httpOptions
    )
  }
  deleteTodo(todoId: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(`${this.baseURL}/todo-lists/${todoId} `, this.httpOptions)
  }
}
