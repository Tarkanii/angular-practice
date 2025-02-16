import { TestBed, waitForAsync } from "@angular/core/testing";
import { TodoService } from "./todo.service";
import { FilterEnums } from "../types/filters.enum";
import { ITodo } from "../types/todo";

describe('Todo Service', () => {
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });

    todoService = TestBed.inject(TodoService);
  });

  // todoService; tests
  it('creates a service', () => {
    expect(todoService).toBeTruthy();
  });

  it('sets intials values', () => {
    expect(todoService.todoList$.value).toEqual([]);
    expect(todoService.filter$.value).toEqual(FilterEnums.all);
  });

  // getFilteredTodos; tests
  describe('getFilteredTodos', () => {
    const data: ITodo[] = [
      { id: '1', title: 'foo', completed: false },
      { id: '2', title: 'buzz', completed: true },
      { id: '3', title: 'buck', completed: false },
    ]

    it('returns the right value for "all" filter', waitForAsync(() => {
      todoService.todoList$.next(data);
      todoService.filter$.next(FilterEnums.all);

      todoService.getFilteredTodos()
        .subscribe((todos: ITodo[]) => {
          expect(todos).toEqual(data);
        })
    }));

    it('returns the right value for "active" filter', waitForAsync(() => {
      todoService.todoList$.next(data);
      todoService.filter$.next(FilterEnums.active);

      todoService.getFilteredTodos()
        .subscribe((todos: ITodo[]) => {
          expect(todos).toEqual(data.filter((todo: ITodo) => !todo.completed));
        })
    }));

    it('returns the right value for "completed" filter', waitForAsync(() => {
      todoService.todoList$.next(data);
      todoService.filter$.next(FilterEnums.completed);

      todoService.getFilteredTodos()
        .subscribe((todos: ITodo[]) => {
          expect(todos).toEqual(data.filter((todo: ITodo) => todo.completed));
        })
    }));
  });

  // addTodo; tests
  describe('addTodo', () => {
    it('adds todo', () => {
      Math.random = function () { return 0; };
      todoService.todoList$.next([]);
      todoService.addTodo('foo');
      expect(todoService.todoList$.value).toEqual([{ id: '0', completed: false, title: 'foo' }]);
    });
  });

  // editTodo; tests
  describe('editTodo', () => {
    it('edits todo', () => {
      todoService.todoList$.next([{ id: '0', completed: false, title: 'foo' }]);
      todoService.editTodo('0', 'buzz');
      expect(todoService.todoList$.value).toEqual([{ id: '0', completed: false, title: 'buzz' }]);
    });
  });

  // toggleCompleted; tests
  describe('toggleCompleted', () => {
    it('toggles completed on todo', () => {
      todoService.todoList$.next([{ id: '0', completed: false, title: 'foo' }]);

      todoService.toggleCompleted('0');
      expect(todoService.todoList$.value).toEqual([{ id: '0', completed: true, title: 'foo' }]);

      todoService.toggleCompleted('0');
      expect(todoService.todoList$.value).toEqual([{ id: '0', completed: false, title: 'foo' }]);
    });
  });

  // deleteTodo; tests
  describe('deleteTodo', () => {
    const data: ITodo[] = [{ id: '0', completed: false, title: 'foo' }];

    it('deletes todo', () => {
      todoService.todoList$.next(data);
      todoService.deleteTodo('0');
      expect(todoService.todoList$.value).toEqual([]);
    });

    it('sets filter to "all" if no todos to show', () => {
      todoService.todoList$.next(data);
      todoService.filter$.next(FilterEnums.completed);
      todoService.deleteTodo('0');
      expect(todoService.filter$.value).toEqual(FilterEnums.all);
    });
  });

  // setFilter; tests
  describe('setFilter', () => {
    it('sets filter', () => {
      todoService.filter$.next(FilterEnums.all);
      todoService.setFilter(FilterEnums.active);
      expect(todoService.filter$.value).toEqual(FilterEnums.active);
    });
  });

});