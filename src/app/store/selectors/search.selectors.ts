import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { SearchState } from '../reducers/search.reducer';

export const getSearchState = createSelector(
  fromFeature.getSearchFeature,
  (state: SearchState) => state
);

export const getSearchLoaded = createSelector(
  getSearchState,
  search => search.loaded
);
