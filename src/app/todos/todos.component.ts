import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../services/todos.service'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos: Todo[] = []

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos().subscribe(res => {
      this.todos = res
    })
  }

  createTodo() {
    const title = 'Angular Learn'
    this.todosService.createTodo(title).subscribe(res => {
      this.todos.unshift(res.data.item)
    })
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(el => el.id !== todoId)
    })
  }

  onClickHandlerDeleteTodo(id: string) {
    this.deleteTodo(id)
  }
}
