import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface Todo {
  addedDate: string
  id: string
  order: number
  title: string
}

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private http: HttpClient) {}

  todos: Todo[] = []

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.http
      .get<Todo[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        withCredentials: true,
        headers: {
          'api-key': '31e5f258-a64c-4753-8a60-acee980643ae',
        },
      })
      .subscribe(res => {
        this.todos = res
      })
  }
}
