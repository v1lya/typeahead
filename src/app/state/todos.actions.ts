import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Todo} from "../models/todo";

export const GetTodosActions = createActionGroup({
  source: 'Todos API',
  events: {
    'getTodosList': emptyProps(),
    'getTodosListSuccess': props<{ todos: Todo[] }>(),
    'getTodosListError': props<{ error: any }>(),
  }
})

export const GetTodoActions = createActionGroup({
  source: 'Todo API',
  events: {
    'getSingleTodo': props<{ id: string }>(),
    'getSingleTodoSuccess': props<{ todo: Todo }>(),
    'getSingleTodoError': props<{ error: any }>()
  }
})

export const Filter = createActionGroup({
  source: 'Filter',
  events: {
    'filterSuggestions': props<{ query: string }>(),
    'filterTodos': props<{ query: string }>(),
  }
})

export const Set = createActionGroup({
  source: 'Set',
  events: {
    'setSuggestions': props<{ suggestions: string[] }>(),
    'setFilteredTodos': props<{ filtered: Todo[] }>(),
    'setQuery': props<{ query: string }>()
  }
})
