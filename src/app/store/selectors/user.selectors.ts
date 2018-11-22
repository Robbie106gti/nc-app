import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { UserState } from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromFeature.getUser,
  (state: UserState) => state
);

export const getUserLoggedin = createSelector(
  getUserState,
  user => user.loaded
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
