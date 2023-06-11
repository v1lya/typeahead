import {Injectable} from "@angular/core";
import {ApiService} from "../services/api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, debounceTime, distinctUntilChanged, map, of, switchMap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {TodosState} from "./todos.reducer";
import * as TodoActions from './todos.actions';
import * as TodoSelectors from './todos.selectors';


@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.GetTodosActions.gettodoslist),
      switchMap(() => this.apiService.getTodos().pipe(
          map((todos) => TodoActions.GetTodosActions.gettodoslistsuccess({todos})),
          catchError((error) => of(TodoActions.GetTodosActions.gettodoslisterror({error})))
        )
      )
    )
  );

  filterSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.Filter.filtersuggestions),
      withLatestFrom(this.store.select(TodoSelectors.selectAllTodosTitles)),
      distinctUntilChanged(),
      debounceTime(300),
      map(([action, titles]) => titles.filter((t) => t.includes(action.query))),
      map((suggestions) => TodoActions.Set.setsuggestions({suggestions}))
    )
  );

  filterTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.Set.setquery),
      withLatestFrom(this.store.select(TodoSelectors.selectAllTodos)),
      map(([{query}, todos]) => todos.filter((t) => t.title.includes(query))),
      map((filtered) => TodoActions.Set.setfilteredtodos({filtered}))
    )
  );

  constructor(private actions$: Actions, private store: Store<TodosState>, private apiService: ApiService) {
  }
}
