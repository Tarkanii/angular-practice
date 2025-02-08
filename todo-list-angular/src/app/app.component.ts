import { Component } from '@angular/core';
import {
    HeaderComponent,
    TodoListComponent,
    FiltersComponent,
} from './components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [HeaderComponent, FiltersComponent, TodoListComponent],
})
export class AppComponent {}
