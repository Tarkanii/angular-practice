import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component"
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  // HeaderComponent; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('adds todo', () => {
    jest.spyOn(todoService, 'addTodo').mockImplementation(() => {});
    const input = fixture.debugElement.query(
      By.css('[data-testid=input]')
    );
    input.nativeElement.value = 'foo';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todoService.addTodo).toHaveBeenCalledWith('foo');
    expect(component.text).toEqual('');
  });

  it('doesnt add todo if no text', () => {
    jest.spyOn(todoService, 'addTodo').mockImplementation(() => {});
    const input = fixture.debugElement.query(
      By.css('[data-testid=input]')
    );

    input.nativeElement.value = '';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todoService.addTodo).toHaveBeenCalledTimes(0);

    input.nativeElement.value = '   ';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todoService.addTodo).toHaveBeenCalledTimes(0);
    expect(component.text).toEqual('');
  });

});