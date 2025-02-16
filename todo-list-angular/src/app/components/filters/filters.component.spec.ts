import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FiltersComponent } from "./filters.component"
import { TodoService } from "../../services/todo.service";
import { By } from "@angular/platform-browser";
import { FilterEnum } from "../../types/filter.enum";

describe('FilterComponent', () => {
  let fixture: ComponentFixture<FiltersComponent>;
  let component: FiltersComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  // FiltersComponents; tests
  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  it('renders filters if there are todos', () => {
    todoService.todosSignal.set([{ id: '0', isCompleted: false, text: 'foo' }]);
    fixture.detectChanges();
    const filtersList = fixture.debugElement.query(
      By.css('[data-testid=filtersList]')
    );
    expect(filtersList.nativeElement).toBeDefined();
  });

  it('doesnt render filters if there are no todos', () => {
    const filtersList = fixture.debugElement.query(
      By.css('[data-testid=filtersList]')
    );
    expect(filtersList?.nativeElement).not.toBeDefined();
  });

  it('highlights default filter button', () => {
    todoService.todosSignal.set([{ id: '0', isCompleted: false, text: 'foo' }]);
    fixture.detectChanges();
    const filterButtons = fixture.debugElement.queryAll(
      By.css('[data-testid="filterButton"]')
    );
    expect(filterButtons[0].classes['selected']).toBe(true);
  });

  it('highlights selected filter button', () => {
    todoService.todosSignal.set([{ id: '0', isCompleted: false, text: 'foo' }]);
    todoService.filterSignal.set(FilterEnum.active);
    fixture.detectChanges();
    const filterButtons = fixture.debugElement.queryAll(
      By.css('[data-testid="filterButton"]')
    );
    expect(filterButtons[1].classes['selected']).toBe(true);
  });

  it('selects new filter', () => {
    todoService.todosSignal.set([{ id: '0', isCompleted: false, text: 'foo' }]);
    fixture.detectChanges();
    const filterButtons = fixture.debugElement.queryAll(
      By.css('[data-testid="filterButton"]')
    );
    filterButtons[1].triggerEventHandler('click');
    expect(todoService.filterSignal()).toBe(FilterEnum.active);
  });
});