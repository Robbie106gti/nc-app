import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { Ui } from 'src/app/models/ui';

export const getRouterState = createSelector(
  fromFeature.getUi,
  (state: Ui) => state
);
