import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { UserState } from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromFeature.getUserFeature,
  (state: UserState) => state
);

export const getUserLoaded = createSelector(
  getUserState,
  user => user.loaded
);

export const getUserLoading = createSelector(
  getUserState,
  user => user.loading
);

export const getUserEntrypoint = createSelector(
  getUserState,
  user => user.enterypoint
);

export const getLoginTries = createSelector(
  getUserState,
  user => user.fails
);

export const getLoginError = createSelector(
  getUserState,
  user => user.loginerror
);

export const getUserSopRights = createSelector(
  getUserState,
  user => user.data.roles.sop
);

export const getUserMdsRights = createSelector(
  getUserState,
  user => user.data.roles.mds
);

export const getUserEditRights = createSelector(
  getUserState,
  user => user.data.roles.editor
);
