import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSop from '../../sop/store/';
import { SearchState } from '../reducers/search.reducer';

export const getSearchState = createSelector(
  fromFeature.getSearchFeature,
  (state: SearchState) => state
);

export const getSearchLoaded = createSelector(
  getSearchState,
  search => search.loaded
);

export const getSearchLoading = createSelector(
  getSearchState,
  search => search.loading
);

export const getSearchResults = createSelector(
  getSearchState,
  search => search.results
);

export const getSearch = createSelector(
  getSearchState,
  search => search
);
