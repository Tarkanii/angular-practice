import { Component } from '@angular/core';
import { ITodo } from '../../types/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [TodoItemComponent, AsyncPipe]
})
export class TodoListComponent {

  public todoList$: Observable<ITodo[]>;
  
  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.getFilteredTodos();
  }

}
