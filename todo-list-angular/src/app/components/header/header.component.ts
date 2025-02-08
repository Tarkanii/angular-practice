import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    public text: string = '';

    constructor(private todoService: TodoService) {}

    public handleChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.text = target.value;
    }

    public addTodo(): void {
        if (this.text.trim().length > 0) {
            this.todoService.addTodo(this.text);
        }
        this.text = '';
    }
}
