import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
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

export const getMainFeature = createFeatureSelector<fromMain.MainState>(
  'mainSops'
);
export const getSubFeature = createFeatureSelector<fromSub.SubState>('subSops');
