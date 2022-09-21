import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
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
  constructor(private http: HttpClient) {}

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  baseURL = environment.baseURL

  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': environment.apiKey,
    },
  }

  getTodos() {
    this.http.get<Todo[]>(`${this.baseURL}/todo-lists`, this.httpOptions).subscribe(todos => {
      this.todos$.next(todos)
    })
  }

  createTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${this.baseURL}/todo-lists`, { title }, this.httpOptions)
      .pipe(
        map(res => {
          const newTodo = res.data.item
          const stateTodos = this.todos$.getValue()
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<BaseResponse>(`${this.baseURL}/todo-lists/${todoId} `, this.httpOptions)
      .pipe(
        map(res => {
          return this.todos$.getValue().filter(el => el.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
