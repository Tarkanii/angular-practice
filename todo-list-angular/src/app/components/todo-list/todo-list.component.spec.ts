import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component"
import { TodoService } from "../../services/todo.service";
import { ITodo } from "../../types/todo";
import { FilterEnum } from "../../types/filter.enum";
import { By } from "@angular/platform-browser";

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  // TodoListComponent; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('renders todos if there are any', () => {
    todoService.todosSignal.set([{id: '0', isCompleted: true, text: 'foo'}]);
    fixture.detectChanges();
    const todoContainers = fixture.debugElement.queryAll(
      By.css('[data-testid=todoContainer]')
    );
    expect(todoContainers.length).toEqual(1);
  });

  it('doesnt render todos if there are none', () => {
    const todoContainers = fixture.debugElement.queryAll(
      By.css('[data-testid=todoContainer]')
    );
    expect(todoContainers.length).toEqual(0);
  });

  // visibleTodos; tests
  describe('visibleTodos', () => {
    const data = [
      {id: '0', isCompleted: true, text: 'foo'},
      {id: '1', isCompleted: true, text: 'bar'},
      {id: '2', isCompleted: false, text: 'buzz'},
    ];

    beforeEach(() => {
      todoService.todosSignal.set(data);
      fixture.detectChanges();
    });

    it('returns all todos if filter is "all"', () => {
      expect(component.visibleTodos()).toEqual(data);
    });

    it('returns not completed todos if filter is "active"', () => {
      todoService.filterSignal.set(FilterEnum.active);
      fixture.detectChanges();
      expect(component.visibleTodos()).toEqual(
        data.filter((todo: ITodo) => !todo.isCompleted)
      );
    });

    it('returns completed todos if filter is "completed"', () => {
      todoService.filterSignal.set(FilterEnum.completed);
      fixture.detectChanges();
      expect(component.visibleTodos()).toEqual(
        data.filter((todo: ITodo) => todo.isCompleted)
      );
    });
  });
});