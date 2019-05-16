import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/';
import * as fromSub from '../reducers/sub.reducer';

export const getSubCatalogState = createSelector(
  fromFeature.getSubFeature,
  (state:  fromSub.SubState) => state
);

export const getSubCatalogLoaded = createSelector(
  getSubCatalogState,
  state => state.loaded
);

export const getSubCatalogEntities = createSelector(
  getSubCatalogState,
  state => state.entities
);

export const getSubCatalogArray = createSelector(
  getSubCatalogEntities,
  entities => Object.keys(entities).map(id => entities[id])
);
