import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getSubSopState = createSelector(
  fromFeature.getSubFeature,
  (state: any) => state
);

export const getSopsLoaded = createSelector(
  getSubSopState,
  state => state.loaded
);

export const getSopEntities = createSelector(
  getSubSopState,
  state => state.entities
);

export const getSopArray = createSelector(
  getSopEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
