import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { Ui } from 'src/app/models/ui';

export const getUiState = createSelector(
  fromFeature.getUiFeature,
  (state: Ui) => state
);

export const getUiCategories = createSelector(
  getUiState,
  ui => ui.categories.filter(cat => !cat.hidden)
);

export const getUiHeaders = createSelector(
  getUiState,
  ui => ui.header
);
export const getUiSlides = createSelector(
  getUiState,
  ui => ui.slides
);
export const getUiDashboard = createSelector(
  getUiState,
  ui => ui.dashboard.filter(dash => !dash.default_hidden)
);
