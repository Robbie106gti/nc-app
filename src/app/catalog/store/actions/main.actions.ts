import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_MAIN_CATALOG = '[CATALOG] Load CATALOG main catagories';
export const LOADED_MAIN_CATALOG = '[CATALOG] Loaded CATALOG main catagories';
export const LOAD_FAIL_MAIN_CATALOG = '[CATALOG] Failed loading CATALOG main catagories';

export class LoadMainCatalog implements Action {
  readonly type = LOAD_MAIN_CATALOG;
}
export class LoadedMainCatalog implements Action {
  readonly type = LOADED_MAIN_CATALOG;
  constructor(public payload: any) {}
}
export class FailLoadingMainCatalog implements Action {
  readonly type = LOAD_FAIL_MAIN_CATALOG;
  constructor(public payload: any) {}
}

// action types
export type ActionsMain = LoadMainCatalog | LoadedMainCatalog | FailLoadingMainCatalog;
