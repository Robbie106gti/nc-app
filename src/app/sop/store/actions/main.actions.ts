import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_MAIN_SOPS = '[SOP] Load SOP main catagories';
export const LOADED_MAIN_SOPS = '[SOP] Loaded SOP main catagories';
export const LOAD_FAIL_MAIN_SOPS = '[SOP] Failed loading SOP main catagories';

export class LoadMain implements Action {
  readonly type = LOAD_MAIN_SOPS;
}
export class LoadedMain implements Action {
  readonly type = LOADED_MAIN_SOPS;
  constructor(public payload: any) {}
}
export class FailLoadingMain implements Action {
  readonly type = LOAD_FAIL_MAIN_SOPS;
  constructor(public payload: any) {}
}

// action types
export type ActionsMain = LoadMain | LoadedMain | FailLoadingMain;
