import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers/';
import * as fromSub from '../reducers/sub.reducer';

export const getSubSopState = createSelector(
  fromFeature.getSubFeature,
  (state:  fromSub.SubState) => state
);

export const getSubSopsLoaded = createSelector(
  getSubSopState,
  fromRoot.getRouterParams,
  (state, params) => {
    const loaded = state.loaded.includes(params.sop);
    // console.log(loaded);
    return loaded;
  }
);

export const getSubSopEntities = createSelector(
  getSubSopState,
  state => state.entities
);

export const getSubSopArray = createSelector(
  getSubSopEntities,
  entities => Object.keys(entities).map(id => entities[id])
);

export const getSubSopCat = createSelector(
  getSubSopEntities,
  fromRoot.getRouterParams,
  (entities, params) => {
    // console.log(entities);
    if (!params.sop) { return []; }
    if (!entities[params.sop]) { return []; }
    // console.log(entities[params.sop]);
    return Object.values(entities[params.sop]);
  }
);

export const getSopDoc = createSelector(
  getSubSopEntities,
  fromRoot.getRouterParams,
  (entities, params) => {
    if (!params.sop || !params.doc) { return {}; }
    return entities[params.sop][params.doc];
  }
);
