import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouterState from './router-state.reducer';
import * as fromUser from './user.reducer';

export interface State {
  routerState: {};
  user: {};
}

export const reducers: ActionReducerMap<State> = {
  routerState: fromRouterState,
  user: fromUser
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
export const getRouterState = createFeatureSelector<fromRouterState.State>(
  'routerReducer'
);
export const getUser = createFeatureSelector<fromUser.State>('user');
