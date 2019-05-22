import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMain from '../reducers/main.reducer';

export const getMainCatalogState = createSelector(
  fromFeature.getMainFeature,
  (state: fromMain.MainState) => state
);

export const getMainCatalogLoaded = createSelector(
  getMainCatalogState,
  state => state.loaded
);

export const getMainCatalogEntities = createSelector(
  getMainCatalogState,
  state => state.entities
);

export const getMainCatalogArray = createSelector(
  getMainCatalogEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
