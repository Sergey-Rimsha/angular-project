import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../services/todos.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos$!: Observable<Todo[]>

  error = ''

  ngOnInit(): void {
    //subscribe
    this.todos$ = this.todosService.todos$
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos()
  }

  createTodo() {
    const title = 'Angular Learn'

    this.todosService.createTodo(title)
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId)
  }

  onClickHandlerDeleteTodo(id: string) {
    this.deleteTodo(id)
  }
}
