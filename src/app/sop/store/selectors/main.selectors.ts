import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMain from '../reducers/main.reducer';

export const getMainSopState = createSelector(
  fromFeature.getMainFeature,
  (state: any) => {
    console.log(state);
    return state;
  }
);

export const getMainSopsLoaded = createSelector(
  getMainSopState,
  state => state.loaded
);

export const getMainSopEntities = createSelector(
  getMainSopState,
  entities => entities
);

export const getMainSopArray = createSelector(
  getMainSopEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
