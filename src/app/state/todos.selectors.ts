import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TodosState} from "./todos.reducer";

export const selectTodos = createFeatureSelector<TodosState>('todos');
export const selectAllTodos = createSelector(selectTodos, (state) => state.all);
export const selectSuggestions = createSelector(selectTodos, (state) => state.suggestions);
export const selectFilteredTodos = createSelector(selectTodos, (state) => state.filtered);
export const selectAllTodosTitles = createSelector(selectAllTodos, (state) => state.map(t => t.title));

