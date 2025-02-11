import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../types/todo';
import { TodoService } from '../../services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  imports: [NgClass]
})
export class TodoItemComponent implements OnInit {

  @Input({ required: true }) public todo!: ITodo;
  public inputValue: string = '';

  constructor(private todoService: TodoService) {}

  public ngOnInit() {
    this.inputValue = this.todo.title;
  }

  // Changing input value to edit todo's title
  public handleInputChange(e: KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
  }

  // Edit todo
  public editTodo(e: Event): void {
    (e.target as HTMLInputElement).blur();
    
    if (this.inputValue === this.todo.title) return;

    if (!this.inputValue.trim().length) {
      this.inputValue = this.todo.title;
      return  
    }
    
    this.todoService.editTodo(this.todo.id, this.inputValue);
  }

  // Toggle todo completed
  public toggleCompleted(): void {
    this.todoService.toggleCompleted(this.todo.id);
  }

  // Delete todo
  public deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }

}
