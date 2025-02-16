import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { ITodo } from '../../types/todo';
import { FilterEnums } from '../../types/filters.enum';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [NgClass, AsyncPipe]
})
export class HeaderComponent {
  
  // Todo title
  public inputValue: string = '';
  public todoList$: Observable<ITodo[]>;
  public filter$: Observable<string>;
  public filters: string[] = Object.values(FilterEnums);

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.todoList$;
    this.filter$ = this.todoService.filter$;
  }

  // Setting todo title as user types
  public handleInputChange(e: KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
  }

  // Add new todo and clears input
  public handleSubmit(): void {
    if (this.inputValue.trim().length > 0) {
      this.todoService.addTodo(this.inputValue);
    }
    this.inputValue = '';
  }

  // Set filter
  public setFilter(filter: string): void {
    this.todoService.setFilter(filter);
  }
  
}