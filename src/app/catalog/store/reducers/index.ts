import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMain from './main.reducer';
import * as fromSub from './sub.reducer';

export interface CatalogState {
  mainCatalog: fromMain.MainState;
  subCatalog: fromSub.SubState;
}

export const reducers: ActionReducerMap<CatalogState> = {
  mainCatalog: fromMain.reducer,
  subCatalog: fromSub.reducer
};

export const getCatalogStateFeature = createFeatureSelector<CatalogState>(
  'catalogState'
);

export const getSubFeature = createSelector(
  getCatalogStateFeature,
  (state:  CatalogState) =>
    state.subCatalog
);

export const getMainFeature = createSelector(
  getCatalogStateFeature,
  (state:  CatalogState) => state.mainCatalog
);