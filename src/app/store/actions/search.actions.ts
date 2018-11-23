import { Action } from '@ngrx/store';

export const SEARCH = '[SEARCH] start';

export class Search implements Action {
  readonly type = SEARCH;
}

export type ActionsSearch = Search;
