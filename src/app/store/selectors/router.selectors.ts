import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { Router, RouterState } from '../reducers';

export const getRouter = createSelector(
  fromFeature.getRouterFeature,
  (state: Router) => state
);

export const getNavId = createSelector(
  getRouter,
  (state: Router) => state.navigationId
);

export const getRouterState = createSelector(
  getRouter,
  (state: Router) => state.state
);

export const getRouterUrl = createSelector(
  getRouterState,
  (state: RouterState) => state.url
);

export const getRouterParams = createSelector(
  getRouterState,
  (state: RouterState) => state.params
);

export const getRouterQueryParams = createSelector(
  getRouterState,
  (state: RouterState) => state.queryParams
);
