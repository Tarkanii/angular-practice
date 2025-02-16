import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoItemComponent } from "./todo-item.component"
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";

describe('TodoItem', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    component.todo = { id: '0', completed: false, title: 'foo' };
    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('set initial values', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid=todo]'));
    const todoCheckbox = fixture.debugElement.query(By.css('[data-testid=todoCheckbox]'));
    const todoInput = fixture.debugElement.query(By.css('[data-testid=todoInput]'));

    expect(todo.classes['completed']).not.toBeDefined();
    expect(todoInput.nativeElement.value).toEqual('foo');
    expect(todoCheckbox.nativeElement.checked).toEqual(false);
  });

  it('toggles completed on todo', () => {
    spyOn(todoService, 'toggleCompleted');
    const todoCheckbox = fixture.debugElement.query(By.css('[data-testid=todoCheckbox]'));
    todoCheckbox.nativeElement.dispatchEvent(new Event('change'));
    expect(todoService.toggleCompleted).toHaveBeenCalledWith('0');
  });

  it('deletes todo', () => {
    spyOn(todoService, 'deleteTodo');
    const todoDeleteButton = fixture.debugElement.query(By.css('[data-testid=todoDeleteButton]'));
    todoDeleteButton.nativeElement.click();
    expect(todoService.deleteTodo).toHaveBeenCalledWith('0');
  });

  // editTodo; tests
  describe('editTodo', () => {
    it('edits todo on "Enter"', () => {
      spyOn(todoService, 'editTodo');
      const todoInput = fixture.debugElement.query(By.css('[data-testid=todoInput]'));
      todoInput.nativeElement.value = 'bar';
      todoInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      expect(todoService.editTodo).toHaveBeenCalledWith('0', 'bar');
    });

    it('edits todo on "blur"', () => {
      spyOn(todoService, 'editTodo');
      const todoInput = fixture.debugElement.query(By.css('[data-testid=todoInput]'));
      component.inputValue = 'bar';
      todoInput.nativeElement.dispatchEvent(new Event('blur'));
      expect(todoService.editTodo).toHaveBeenCalledWith('0', 'bar');
    });

    it('doesnt edit todo if no text', () => {
      spyOn(todoService, 'editTodo');
      const todoInput = fixture.debugElement.query(By.css('[data-testid=todoInput]'));
      todoInput.nativeElement.value = '';
      todoInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      todoInput.nativeElement.value = '    ';
      todoInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      expect(todoService.editTodo).toHaveBeenCalledTimes(0);
    });

    it('doesnt edit todo if same text', () => {
      spyOn(todoService, 'editTodo');
      const todoInput = fixture.debugElement.query(By.css('[data-testid=todoInput]'));
      // 'foo' has been passed in on initialisation of component
      todoInput.nativeElement.value = 'foo';
      todoInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      expect(todoService.editTodo).toHaveBeenCalledTimes(0);
    });
  });
});