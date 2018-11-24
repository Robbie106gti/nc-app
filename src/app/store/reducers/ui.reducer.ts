import * as fromUi from '../actions/ui.actions';
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

export function reducer(
  state = initialState,
  action: fromUi.ActionsUI
): UiState {
  switch (action.type) {
    case fromUi.UI_UPDATE: {
      return { ...state };
    }

    default:
      return state;
  }
}
