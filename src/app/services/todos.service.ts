import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { environment } from '../../environments/environment'
import { LogService } from './log.service'

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
  constructor(private http: HttpClient, private logService: LogService) {}

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  baseURL = environment.baseURL

  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': environment.apiKey,
    },
  }

  getTodos() {
    this.http
      .get<Todo[]>(`${this.baseURL}/todo-lists`, this.httpOptions)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  createTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${this.baseURL}/todo-lists`, { title }, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this)),
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
        catchError(this.errorHandler.bind(this)),
        map(res => {
          return this.todos$.getValue().filter(el => el.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.logService.log(error.message, 'error')
    return EMPTY
  }
}
