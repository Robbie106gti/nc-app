import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { Ui } from 'src/app/models/ui';

export const getSearchState = createSelector(
  fromFeature.getUi,
  (state: Ui) => state
);
