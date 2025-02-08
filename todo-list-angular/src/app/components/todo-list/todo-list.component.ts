import { Component, computed, Signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';
import { ITodo } from '../../types/todo';
import { TodoComponent } from '../todo/todo.component';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
    imports: [TodoComponent],
})
export class TodoListComponent {
    constructor(private todoService: TodoService) {}

    public visibleTodos: Signal<ITodo[]> = computed(() => {
        const todos = this.todoService.todosSignal();
        const filter = this.todoService.filterSignal();

        if (filter === FilterEnum.active) {
            return todos.filter((todo: ITodo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
            return todos.filter((todo: ITodo) => todo.isCompleted);
        }

        return todos;
    });
}
