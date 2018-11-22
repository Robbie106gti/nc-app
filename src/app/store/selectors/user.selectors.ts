import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { UserState } from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromFeature.getUser,
  (state: UserState) => state
);

export const gerUserLoggedin = createSelector(
  getUserState,
  user => user.loaded
);
