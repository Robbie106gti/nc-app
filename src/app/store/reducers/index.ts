import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user.reducer';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';

export interface State {
  routerState: fromRouter.RouterReducerState<Router>;
  userState: User;
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
  userState: fromUser.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
export const selectReducerState = createFeatureSelector<
  fromRouter.RouterReducerState<Router>
>('routerState');
export const getUser = createFeatureSelector<fromUser.UserState>('userState');

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
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
