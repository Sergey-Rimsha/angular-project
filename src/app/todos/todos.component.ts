import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../services/todos.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos: Todo[] = []

  error = ''

  ngOnInit(): void {
    this.getTodos()
  }

  _getTodos() {
    this.todosService.getTodos().subscribe(res => {
      this.todos = res
    })
  }

  getTodos() {
    this.todosService.getTodos().subscribe({
      next: res => {
        this.todos = res
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message
      },
    })
  }

  createTodo() {
    const title = 'Angular Learn'
    this.todosService.createTodo(title).subscribe({
      next: res => {
        this.todos.unshift(res.data.item)
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message
      },
    })
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(el => el.id !== todoId)
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message
      },
    })
  }

  onClickHandlerDeleteTodo(id: string) {
    this.deleteTodo(id)
  }
}
