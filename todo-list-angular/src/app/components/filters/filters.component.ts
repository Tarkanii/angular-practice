import { Component, computed, Signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss',
    imports: [NgClass],
})
export class FiltersComponent {
    public filterOptions: string[] = Object.values(FilterEnum);
    public filtersSignal: WritableSignal<string>;
    public renderFilters: Signal<boolean>;

    constructor(private todoService: TodoService) {
        this.filtersSignal = this.todoService.filterSignal;
        this.renderFilters = computed(
            () => this.todoService.todosSignal().length !== 0
        );
    }

    public setFilter(filter: string): void {
        this.todoService.setFilter(filter);
    }
}
