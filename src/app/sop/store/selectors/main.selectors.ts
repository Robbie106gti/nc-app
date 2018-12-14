import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMain from '../reducers/main.reducer';

export const getMainSopState = createSelector(
  fromFeature.getMainFeature,
  (state: fromMain.MainState) => state
);

export const getMainSopsLoaded = createSelector(
  getMainSopState,
  state => state.loaded
);

export const getMainSopEntities = createSelector(
  getMainSopState,
  state => state.entities
);

export const getMainSopArray = createSelector(
  getMainSopEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
