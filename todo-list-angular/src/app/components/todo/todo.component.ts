import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../types/todo';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrl: 'todo.component.scss',
    imports: [NgClass],
})
export class TodoComponent implements OnInit {
    @Input({ required: true }) public todo!: ITodo;

    public newText: string = '';

    constructor(private todoService: TodoService) {}

    public ngOnInit() {
        this.newText = this.todo.text;
    }

    public handleChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.newText = target.value;
    }

    public editTodo(): void {
        if (this.newText === this.todo.text) return;

        if (this.newText.trim().length === 0) {
            this.newText = this.todo.text;
            return;
        }
        this.todoService.editTodo(this.todo.id, this.newText);
    }

    public toggleCompleted(): void {
        this.todoService.toggleCompleted(this.todo.id);
    }

    public deleteTodo(): void {
        this.todoService.deleteTodo(this.todo.id);
    }
}
