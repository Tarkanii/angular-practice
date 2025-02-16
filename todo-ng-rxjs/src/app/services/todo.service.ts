import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { ITodo } from "../types/todo";
import { FilterEnums } from "../types/filters.enum";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Observables for storing curent filter and todos
  public todoList$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  public filter$: BehaviorSubject<string> = new BehaviorSubject<string>(FilterEnums.all)

  // Getting filtered todos
  public getFilteredTodos(): Observable<ITodo[]> {
    return combineLatest(this.todoList$, this.filter$).pipe(
      map(([todoList, filter]) => {
        if (filter === FilterEnums.active) {
          return todoList.filter((todo: ITodo) => !todo.completed);
        } else if (filter === FilterEnums.completed) {
          return todoList.filter((todo: ITodo) => todo.completed);
        }

        return todoList;
      })
    )
  }

  // Adding new todo
  public addTodo(title: string): void {
    const newTodo = {
      id: Math.random().toString(16),
      title,
      completed: false
    }

    this.todoList$.next([newTodo, ...this.todoList$.value]);
  }

  // Edit todo
  public editTodo(id: string, newTitle: string): void {
    const newTodoList = this.todoList$.value.map((todo: ITodo) => todo.id === id ? {...todo, title: newTitle} : todo);
    this.todoList$.next(newTodoList);
  }

  // Toggle completed
  public toggleCompleted(id: string): void {
    const newTodoList = this.todoList$.value.map((todo: ITodo) => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    this.todoList$.next(newTodoList);
  }

  // Deleting todo
  public deleteTodo(id: string): void {
    const newTodoList = this.todoList$.value.filter((todo: ITodo) => todo.id !== id);
    
    // Setting the right filter
    if (newTodoList.length === 0) this.setFilter(FilterEnums.all);
    this.todoList$.next(newTodoList);
  }
  
  // Setting filter
  public setFilter(filter: string): void {
    this.filter$.next(filter);
  }
  
}