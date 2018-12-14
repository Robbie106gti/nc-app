import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/';
import * as fromSub from '../reducers/sub.reducer';

export const getSubSopState = createSelector(
  fromFeature.getSubFeature,
  (state:  fromSub.SubState) => state
);

export const getSubSopsLoaded = createSelector(
  getSubSopState,
  state => state.loaded
);

export const getSubSopEntities = createSelector(
  getSubSopState,
  state => state.entities
);

export const getSubSopArray = createSelector(
  getSubSopEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
