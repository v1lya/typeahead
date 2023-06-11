import {Todo} from "../models/todo";
import {createReducer, on} from "@ngrx/store";
import * as TodoActions from '../state/todos.actions';

export interface TodosState {
  all: Todo[];
  filtered: Todo[];
  suggestions: string[]
  query: string;
}

export const initialState: TodosState = {
  all: [],
  filtered: [],
  suggestions: [],
  query: ''
};

export const todosReducer = createReducer(
  initialState,
  on(TodoActions.GetTodosActions.gettodoslistsuccess, (state, {todos}) => ({
    ...state,
    all: [...todos]
  })),
  on(TodoActions.Set.setsuggestions, (state, {suggestions}) => ({...state, suggestions})),
  on(TodoActions.Set.setfilteredtodos, (state, {filtered}) => ({...state, filtered})),
)
