import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user.reducer';
import * as fromUi from './ui.reducer';
import * as fromSearch from './search.reducer';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Ui } from 'src/app/models/ui';
import { SearchState } from './search.reducer';

export interface State {
  routerState: fromRouter.RouterReducerState;
  userState: User;
  uiState: Ui;
  searchState: SearchState;
}
export interface Router {
  state: RouterState;
  navigationId: number;
}
export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export const reducers: ActionReducerMap<State> = {
  routerState: fromRouter.routerReducer,
  userState: fromUser.reducer,
  uiState: fromUi.reducer,
  searchState: fromSearch.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
export const getRouterFeature = createFeatureSelector<Router>('routerState');
export const getUserFeature = createFeatureSelector<fromUser.UserState>(
  'userState'
);
export const getUiFeature = createFeatureSelector<fromUi.UiState>('uiState');
export const getSearchFeature = createFeatureSelector<fromSearch.SearchState>(
  'searchState'
);

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    // console.log({ routerState });
    const url = routerState.url;
    const queryParams = routerState.root.queryParams;
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const params = route.params;
    const state = { url, params, queryParams };
    return state;
  }
}
