import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoComponent } from "./todo.component";
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe('TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    component.todo = { id: '0', isCompleted: false, text: 'foo' };
    fixture.detectChanges();
  });

  // TodoComponent; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('has correct intial state', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const todoInput = fixture.debugElement.query(By.css('[data-testid="todoInput"]'));
    const todoRadioButton = fixture.debugElement.query(By.css('[data-testid="todoRadioButton"]'));

    expect(todo.classes['completed']).not.toBeDefined();
    expect(todoInput.nativeElement.value).toEqual('foo');
    expect(todoRadioButton.nativeElement.checked).toEqual(false);
  });

  it('toggles completed on todo', () => {
    jest.spyOn(todoService, 'toggleCompleted').mockImplementation(() => {});
    const todoRadioButton = fixture.debugElement.query(By.css('[data-testid="todoRadioButton"]'));
    todoRadioButton.triggerEventHandler('change');
    expect(todoService.toggleCompleted).toHaveBeenCalledWith('0');
  });

  it('deletes todo', () => {
    jest.spyOn(todoService, 'deleteTodo').mockImplementation(() => {});
    const todoDeleteButton = fixture.debugElement.query(By.css('[data-testid="todoDeleteButton"]'));
    todoDeleteButton.triggerEventHandler('click');
    expect(todoService.deleteTodo).toHaveBeenCalledWith('0');
  })

  // editTodo; tests
  describe('editTodo', () => {
    let todoInput: DebugElement;

    beforeEach(() => {
      jest.spyOn(todoService, 'editTodo').mockImplementation(() => {});
      todoInput = fixture.debugElement.query(By.css('[data-testid="todoInput"]'));
    })

    
    it('edits todo on "Enter"', () => {
      todoInput.nativeElement.value = 'bar';
      todoInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todoService.editTodo).toHaveBeenCalledWith('0', 'bar');
    });
    
    it('edits todo on "blur"', () => {
      component.newText = 'bar';
      todoInput.nativeElement.dispatchEvent(new Event('blur'));
      expect(todoService.editTodo).toHaveBeenCalledWith('0', 'bar');
    });

    it('doesnt edit todo if no text', () => {
      todoInput.nativeElement.value = '';
      todoInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todoService.editTodo).toHaveBeenCalledTimes(0);
    });

    it('doesnt edit todo if same text', () => {
      // 'foo' has been passed in on component
      todoInput.nativeElement.value = 'foo';
      todoInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todoService.editTodo).toHaveBeenCalledTimes(0);
    });
  });
  
  
});