import { Action } from '@ngrx/store';
import { Init } from './init';
import { Categories, Header, Slides, Dashboard } from '../../models/ui';

export interface UiState {
  categories: Categories[];
  header: Header[];
  slides: Slides[];
  dashboard: Dashboard[];
}

export const initialState: UiState = {
  categories: Init.Categories,
  header: Init.Header,
  slides: Init.Slides,
  dashboard: Init.Dashboard
};

export function reducer(state = initialState, action: Action): UiState {
  switch (action.type) {
    default:
      return state;
  }
}
