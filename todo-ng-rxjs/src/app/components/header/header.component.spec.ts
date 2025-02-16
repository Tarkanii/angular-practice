import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HeaderComponent } from "./header.component"
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";
import { ITodo } from "../../types/todo";
import { FilterEnums } from "../../types/filters.enum";

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  })

  // HeaderComponent; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  // handleSubmit; tests
  describe('handleSubmit', () => {
    it('adds todo', () => {
      spyOn(todoService, 'addTodo');
      const headerInput = fixture.debugElement.query(
        By.css('[data-testid=headerInput]')
      );
      headerInput.nativeElement.value = 'foo';
      headerInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todoService.addTodo).toHaveBeenCalledTimes(1);
      expect(component.inputValue).toEqual('');
    });

    it('doesnt add todo if no text', () => {
      spyOn(todoService, 'addTodo');
      const headerInput = fixture.debugElement.query(
        By.css('[data-testid=headerInput]')
      );
      headerInput.nativeElement.value = '';
      headerInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );

      headerInput.nativeElement.value = '   ';
      headerInput.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todoService.addTodo).toHaveBeenCalledTimes(0);
      expect(component.inputValue).toEqual('');
    });
  });

  // filters tests
  describe('filters', () => {
    beforeEach(() => {
      todoService.todoList$.next([{ id: '0', completed: false, title: 'foo' }]);
      fixture.detectChanges();
    })

    it('renders filters if there are todos', waitForAsync(() => {
      todoService.todoList$.subscribe(() => {
        const headerFilters = fixture.debugElement.query(
          By.css('[data-testid=headerFilters]')
        );
        expect(headerFilters?.nativeElement).toBeDefined();
      });
    }));

    it('doesnt render filters if there are no todos', waitForAsync(() => {
      todoService.todoList$.next([]);
      fixture.detectChanges();
      todoService.todoList$.subscribe(() => {
        const headerFilters = fixture.debugElement.query(
          By.css('[data-testid=headerFilters]')
        );
        expect(headerFilters?.nativeElement).not.toBeDefined();
      });
    }));

    it('highlights default filter', waitForAsync(() => {
      todoService.filter$.subscribe(() => {
        const filterButtons = fixture.debugElement.queryAll(
          By.css('[data-testid=headerFilterButton]')
        );
        expect(filterButtons[0].classes['selected']).toEqual(true);
      });
    }));

    it('highlights selected filter', waitForAsync(() => {
      todoService.filter$.next(FilterEnums.active);
      fixture.detectChanges();
      todoService.filter$.subscribe(() => {
        const filterButtons = fixture.debugElement.queryAll(
          By.css('[data-testid=headerFilterButton]')
        );
        expect(filterButtons[1].classes['selected']).toEqual(true);
      });
    }));

    it('sets filter', waitForAsync(() => {
      spyOn(todoService, 'setFilter');
      todoService.filter$.subscribe(() => {
        const filterButtons = fixture.debugElement.queryAll(
          By.css('[data-testid=headerFilterButton]')
        );
        filterButtons[1].nativeElement.click();
        expect(todoService.setFilter).toHaveBeenCalledTimes(1);
      });
    }));
  });
});