import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface Todo {
  addedDate: string
  id: string
  order: number
  title: string
}

interface BaseResponse<T = {}> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private http: HttpClient) {}

  baseURL = 'https://social-network.samuraijs.com/api/1.1'

  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': '31e5f258-a64c-4753-8a60-acee980643ae',
    },
  }

  todos: Todo[] = []

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.http.get<Todo[]>(`${this.baseURL}/todo-lists`, this.httpOptions).subscribe(res => {
      this.todos = res
    })
  }

  createTodo() {
    const title = 'Angular Learn'
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${this.baseURL}/todo-lists`, { title }, this.httpOptions)
      .subscribe(res => {
        this.todos.unshift(res.data.item)
      })
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<BaseResponse<{}>>(`${this.baseURL}/todo-lists/${todoId} `, this.httpOptions)
      .subscribe(() => {
        this.todos = this.todos.filter(el => el.id !== todoId)
      })
  }

  onClickHandlerDeleteTodo(id: string) {
    this.deleteTodo(id)
  }
}
