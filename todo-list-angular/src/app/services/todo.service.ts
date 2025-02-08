import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITodo } from '../types/todo';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    public todosSignal: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
    public filterSignal: WritableSignal<string> = signal<string>(
        FilterEnum.all
    );

    public addTodo(text: string): void {
        const newTodo: ITodo = {
            id: Math.random().toString(16),
            text,
            isCompleted: false,
        };

        this.todosSignal.update((todos: ITodo[]) => [newTodo, ...todos]);
    }

    public editTodo(id: string, text: string): void {
        this.todosSignal.update((todos: ITodo[]) => {
            return todos.map((todo: ITodo) =>
                todo.id === id ? { ...todo, text } : todo
            );
        });
    }

    public toggleCompleted(id: string): void {
        this.todosSignal.update((todos: ITodo[]) =>
            todos.map((todo: ITodo) =>
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            )
        );
    }

    public deleteTodo(id: string): void {
        this.todosSignal.update((todos: ITodo[]) =>
            todos.filter((todo: ITodo) => todo.id !== id)
        );
    }

    public setFilter(filter: string): void {
        this.filterSignal.set(filter);
    }
}
