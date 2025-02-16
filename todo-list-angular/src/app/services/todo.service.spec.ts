import { TestBed } from "@angular/core/testing";
import { TodoService } from "./todo.service";
import { FilterEnum } from "../types/filter.enum";

describe('Todo Service', () => {
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });

    todoService = TestBed.inject(TodoService);
  });

  // TodoService; tests
  it('creates a service', () => {
    expect(todoService).toBeTruthy();
  });

  it('sets intial values', () => {
    expect(todoService.todosSignal()).toEqual([]);
    expect(todoService.filterSignal()).toEqual(FilterEnum.all);
  });

  // addTodo; tests
  describe('addTodo', () => {
    it('adds new todo', () => {
      Math.random = function () { return 0; };
      todoService.addTodo('foo');
      expect(todoService.todosSignal()).toEqual([{ id: '0', text: 'foo', isCompleted: false }]);
    });
  });

  // editTodo; tests
  describe('editTodo', () => {
    it('edits todo', () => {
      todoService.todosSignal.set([{ id: '0', text: 'foo', isCompleted: false }]);
      todoService.editTodo('0', 'buzz');
      expect(todoService.todosSignal()).toEqual([{ id: '0', text: 'buzz', isCompleted: false }]);
    });
  });

  // toggleCompleted; tests
  describe('toggleCompleted', () => {
    it('toggles completed on todo', () => {
      todoService.todosSignal.set([{ id: '0', text: 'foo', isCompleted: false }]);

      todoService.toggleCompleted('0');
      expect(todoService.todosSignal()).toEqual([{ id: '0', text: 'foo', isCompleted: true }]);

      todoService.toggleCompleted('0');
      expect(todoService.todosSignal()).toEqual([{ id: '0', text: 'foo', isCompleted: false }]);
    });
  });

  // deleteTodo; tests
  describe('deleteTodo', () => {
    it('deletes todo', () => {
      todoService.todosSignal.set([{ id: '0', text: 'foo', isCompleted: false }]);
      todoService.deleteTodo('0');
      expect(todoService.todosSignal()).toEqual([]);
    });
  });

  // setFilter; tests
  describe('setFilter', () => {
    it('sets filter', () => {
      todoService.setFilter(FilterEnum.active);
      expect(todoService.filterSignal()).toEqual(FilterEnum.active);
      todoService.setFilter(FilterEnum.completed);
      expect(todoService.filterSignal()).toEqual(FilterEnum.completed);
    })
  })

});