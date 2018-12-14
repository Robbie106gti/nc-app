import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMain from './main.reducer';
import * as fromSub from './sub.reducer';

export interface SopsState {
  mainSops: fromMain.MainState;
  subSops: fromSub.SubState;
}

export const reducers: ActionReducerMap<SopsState> = {
  mainSops: fromMain.reducer,
  subSops: fromSub.reducer
};

export const getSopsStateFeature = createFeatureSelector<SopsState>(
  'sopsState'
);

export const getSubFeature = createSelector(
  getSopsStateFeature,
  (state:  SopsState) => 
    state.subSops
);

export const getMainFeature = createSelector(
  getSopsStateFeature,
  (state:  SopsState) => state.mainSops
);