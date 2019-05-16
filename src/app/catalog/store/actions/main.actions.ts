import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_MAIN_CATALOG = '[CATALOG] Load CATALOG main catagories';
export const LOADED_MAIN_CATALOG = '[CATALOG] Loaded CATALOG main catagories';
export const LOAD_FAIL_MAIN_CATALOG = '[CATALOG] Failed loading CATALOG main catagories';

export class LoadMain implements Action {
  readonly type = LOAD_MAIN_CATALOG;
}
export class LoadedMain implements Action {
  readonly type = LOADED_MAIN_CATALOG;
  constructor(public payload: any) {}
}
export class FailLoadingMain implements Action {
  readonly type = LOAD_FAIL_MAIN_CATALOG;
  constructor(public payload: any) {}
}

// action types
export type ActionsMain = LoadMain | LoadedMain | FailLoadingMain;
