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
      const payload = action.payload;
      const categories =
        payload.class !== 'NICKELSM'
          ? state.categories
          : state.categories.map(cat => (cat = { ...cat, hidden: false }));
      const dashboard =
        payload.class !== 'NICKELSM'
          ? state.dashboard
          : state.dashboard.map(dash => {
              if (dash.title === 'login') {
                return {
                  ...dash,
                  default_disabled: true,
                  default_hidden: true
                };
              }
              if (dash.title === 'logout') {
                return {
                  ...dash,
                  default_disabled: false,
                  default_hidden: false
                };
              }
              return { ...dash, default_disabled: false };
            });
      return { ...state, categories, dashboard };
    }

    case fromUi.UI_RESET: {
      return initialState;
    }

    default:
      return state;
  }
}
