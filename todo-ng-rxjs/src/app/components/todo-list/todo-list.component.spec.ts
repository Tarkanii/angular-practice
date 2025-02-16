import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component";
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  // TodoListComponent; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('renders todo list if there todos', waitForAsync(() => {
    todoService.todoList$.next([{ id: '0', completed: false, title: 'foo' }]);
    fixture.detectChanges();
    component.todoList$.subscribe(() => {
      const todoList = fixture.debugElement.query(
        By.css('[data-testid=todoList]')
      );
      expect(todoList?.nativeElement).toBeDefined();
    })
  }));

  it('doesnt render todo list if there no todos', waitForAsync(() => {
    component.todoList$.subscribe(() => {
      const todoList = fixture.debugElement.query(
        By.css('[data-testid=todoList]')
      );
      expect(todoList?.nativeElement).not.toBeDefined();
    })
  }));


});