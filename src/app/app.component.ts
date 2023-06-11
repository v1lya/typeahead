import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TodoActions from './state/todos.actions';
import {Store} from "@ngrx/store";
import {Todo} from "./models/todo";
import {Observable, Subject, takeUntil} from "rxjs";
import * as TodosSelectors from './state/todos.selectors'
import * as TodoSelectors from './state/todos.selectors'
import {TodosState} from "./state/todos.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  selectedItem: any;
  suggestions: string[] = [];
  filteredTodos$: Observable<Todo[]> = this.store.select(TodosSelectors.selectFilteredTodos);
  destroy$ = new Subject<void>();

  constructor(private store: Store<TodosState>) {
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.GetTodosActions.gettodoslist());
    this.store.select(TodoSelectors.selectSuggestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((suggestions) => this.suggestions = suggestions);
  }

  search(query: string) {
    this.store.dispatch(TodoActions.Filter.filtersuggestions({query}));
  }

  select(query: string) {
    this.store.dispatch(TodoActions.Set.setquery({query}));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
